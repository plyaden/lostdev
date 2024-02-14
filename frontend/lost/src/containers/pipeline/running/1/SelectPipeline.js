import React, { Component } from 'react';
import actions from '../../../../actions/pipeline/pipelineRunning';

import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../../../../components/IconButton';
import HelpButton from '../../../../components/HelpButton';
import { Progress } from 'reactstrap';
import { getColor } from '../../../../containers/Annotation/AnnoTask/utils';

const { getPipelines, getPipeline, verifyTab, selectTab, reset } = actions;

class SelectPipeline extends Component {
    constructor() {
        super();
        this.selectRow = this.selectRow.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.state = {
            pollingEnabled: false,
        };
    }

    async componentDidMount() {
        const showAlert = true;
        await this.props.getPipelines(showAlert);
    }

    componentDidUpdate() {
        if (this.props.data && !this.state.pollingEnabled) {
            this.setState({ pollingEnabled: true });
            this.timer = setInterval(() => this.props.getPipelines(), 2000);
        }
    }

    componentWillUnmount() {
        this.setState({ pollingEnabled: false });
        clearInterval(this.timer);
    }

    selectRow(id) {
        this.props.verifyTab(0, true);
        this.props.selectTab(1);
        this.props.reset();
        this.props.getPipeline(id);
    }

    handleButtonClick(id) {
        this.selectRow(id);
        console.log('Die ID des geklickten Elements ist:', id);
    }

    renderDatatable() {
        if (this.props.data) {
            if (this.props.data.error) {
                return <div className="pipeline-error-message">{this.props.data.error}</div>;
            }
            const data = this.props.data.response.pipes.map((el) => ({
                ...el,
            }));
            return (
                <ReactTable
                    columns={[
                        {
                            Header: 'Name',
                            accessor: 'name',
                            Cell: (row) => <b>{row.original.name}</b>,
                        },
                        {
                            Header: 'Description',
                            accessor: 'description',
                            Cell: (row) => <HelpButton id={row.original.id} text={row.original.description} />,
                        },
                        {
                            Header: 'Template Name',
                            accessor: 'templateName',
                            Cell: (row) => (
                                <>
                                    <b>{row.original.templateName.split('.')[1]}</b>
                                    <div className="small text-muted">{`${row.original.templateName.split('.')[0]}`}</div>
                                </>
                            ),
                        },
                        {
                            Header: 'Progress',
                            accessor: 'progress',
                            Cell: (row) => {
                                const progress = parseInt(row.value, 10);
                                if (row.value === 'ERROR') {
                                    return <div><font color="red">ERROR</font></div>;
                                }
                                if (row.value === 'PAUSED') {
                                    return <div><font color="orange">PAUSED</font></div>;
                                }
                                return <Progress className="progress-xs rt-progress" color={getColor(progress)} value={progress} />;
                            },
                        },
                        {
                            Header: 'Started on',
                            accessor: 'date',
                            Cell: (row) => new Date(row.original.date).toLocaleString(),
                            sortMethod: (date1, date2) => new Date(date1) > new Date(date2) ? -1 : 1,
                        },
                        {
                            Header: 'Start',
                            Cell: (row) => (
                                <IconButton
                                    className="firstStep"
                                    color="primary"
                                    size="m"
                                    isOutline={false}
                                    onClick={() => {
                                        console.log('Die ID des geklickten Elements ist:', row.original.id);
                                        this.selectRow(row.original.id);
                                    }}
                                    icon={faEye}
                                    text="Open"
                                />
                            ),
                            accessor: 'id',
                        },
                    ]}
                    defaultSorted={[{ id: 'date', desc: false }]}
                    data={data}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
            );
        }
    }

    render() {
        return <div className="pipeline-running-1">{this.renderDatatable()}</div>;
    }
}

const mapStateToProps = (state) => ({
    data: state.pipelineRunning.step0Data,
});

export default connect(mapStateToProps, {
    getPipelines,
    getPipeline,
    verifyTab,
    selectTab,
    reset,
})(SelectPipeline);

