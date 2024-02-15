import pipelineStartActions from "../pipeline/pipelineStart";

export const selectPipelineById = (id) => async (dispatch, getState) => {

   
    await dispatch(pipelineStartActions.getTemplate(id));
    dispatch(pipelineStartActions.verifyTab(0, true));
    dispatch(pipelineStartActions.selectTab(1));
    
}