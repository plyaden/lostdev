//joyRideActions.js

import pipelineStartActions from "../pipeline/pipelineStart";
import DatasourceModal from "../../containers/pipeline/start/2/modals/types/DatasourceModal";


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



// hier soll der Zustand von dem Dropdownmenü verarbeitet werden oder weitergegeben?