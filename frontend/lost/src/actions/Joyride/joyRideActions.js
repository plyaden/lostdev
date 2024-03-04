//joyRideActions.js

import pipelineStartActions from "../pipeline/pipelineStart";
import DatasourceModal from "../../containers/pipeline/start/2/modals/types/DatasourceModal";
import { element } from "prop-types";



export const selectPipelineById = (id) => async (dispatch, getState) => {


    await dispatch(pipelineStartActions.getTemplate(id));
    dispatch(pipelineStartActions.verifyTab(0, true));
    dispatch(pipelineStartActions.selectTab(1));

}

export const handleNodeClick = (id) => (dispatch, getState) => {
    // Zugriff auf den aktuellen Zustand des Stores
    const state = getState();
    const elements = state.pipelineStart.step1Data.elements;
    const element = elements.find((el) => el.peN === id);
    const isDataExport = 'dataExport' in element;
    const isVisualOutput = 'visualOutput' in element;

    // Entscheiden, ob `toggleModal` aufgerufen werden soll
    if (!isDataExport && !isVisualOutput) {
        dispatch(pipelineStartActions.toggleModal(id));
    }
};

export const toggleDropdown = () => {
    return {
        type: 'TOGGLE_DATASOURCE_DROPDOWN',
    };
};


export const selectD = (elementId, path, fsId) => ({

    type: 'PIPELINE_START_DATASOURCE_SELECT_DROPDOWN',
    payload: { elementId, path, fsId },
    
});

