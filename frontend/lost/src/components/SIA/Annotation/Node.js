import React, {Component} from 'react'
import './Annotation.scss'
import './Node.scss'



class Node extends Component{

        /*************
         * LIFECYCLE *
        **************/
    constructor(props){
        super(props)
        this.state = {
            haloCss: 'halo-off',
            selAreaCss: 'sel-area-off',
            anno: undefined
        }
    }

    componentDidMount(){
        this.setState({anno: this.props.anno})
        switch (this.props.mode){
            case 'create':
                if (this.props.idx !== 0){
                    console.log('Turn selArea on', this.props.idx)
                    this.turnSelAreaOn()
                }
            default:
                break
        }
    }

    componentDidUpdate(prevProps){
        console.log('ENodeE did update', this.props.idx)
    }

    /*************
     * EVENTS    *
    **************/

    onClick(e){
        this.turnHaloOn()
        if (this.props.onClick){
            this.props.onClick(e, this.props.idx)
        }
    }

    onMouseMove(e){
        if (this.props.onMouseMove){
            this.props.onMouseMove(e, this.props.idx)
        }
        switch (this.props.mode){
            case 'create':
                let newAnno = [...this.state.anno]
                newAnno[this.props.idx].x += e.movementX
                newAnno[this.props.idx].y += e.movementY
                this.setState({
                    anno: newAnno
                })
            default:
                break
        }
    }

    onContextMenu(e: Event){
        e.preventDefault()
    }

    onMouseUp(e: Event){
        if (this.props.onMouseUp){
            this.props.onMouseUp(e, this.props.idx)
        }
    }

    onMouseDown(e: Event){
        switch (this.props.mode){
            case 'create':
                if (e.button === 2 || e.button === 0){
                    this.turnSelAreaOff()
                }
            default:
                break
        }
        if (this.props.onMouseDown){
            this.props.onMouseDown(e, this.props.idx, this.state.anno)
        }
    }
    onMouseEnter(e: Event){
        if (this.props.isSelected){
            this.turnHaloOn()
        }
    }

    onMouseLeave(e){
        if (this.props.isSelected){
            this.turnHaloOff()
        }
    }

    onDoubleClick(e){
        if (this.props.onDoubleClick){
            this.props.onDoubleClick(e, this.props.idx)
        }
    }


    /*************
     * LOGIC     *
    **************/
    turnSelAreaOn(){
        this.setState({
            selAreaCss: 'sel-area-on'
        })
    }

    turnSelAreaOff(){
        this.setState({
            selAreaCss: 'sel-area-off'
        })
    }

    turnHaloOn(){
        console.log('Turn halo-on ', this.props.idx)
        this.setState({
            haloCss: 'halo-on'
        })
    }

    turnHaloOff(){
        console.log('Turn halo-off ', this.props.idx)
        this.setState({
            haloCss: 'halo-off'
        })
    }

    /*************
     * RENDERING *
    **************/
    renderNodes(){
        const data = this.props.anno[this.props.idx]

        return (
            <g
                onClick={(e) => this.onClick(e)}
                onMouseMove={e => this.onMouseMove(e)}
                onContextMenu={e => this.onContextMenu(e)}
                onMouseUp={e => this.onMouseUp(e)}
                onMouseDown={e => this.onMouseDown(e)}
                onDoubleClick={e => this.onDoubleClick(e)}
            >
                <circle cx={data.x} cy={data.y} r={'100%'}
                    className={this.state.selAreaCss}
                />
                <circle cx={data.x} cy={data.y} r={20}
                    className={this.state.haloCss}
                />
                <circle cx={data.x} 
                    cy={data.y} 
                    r={5} fill="red"
                    style={this.props.style}
                    className={this.props.className}
                    onMouseEnter={e => this.onMouseEnter(e)}
                    onMouseLeave={e => this.onMouseLeave(e)}
                />
            </g>
        )
    }
    render(){
            return(
                <g>
                    {this.renderNodes()}
                </g>
                )
    }
}

export default Node;