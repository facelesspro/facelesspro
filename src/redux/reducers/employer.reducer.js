import { combineReducers } from 'redux';




const allJobs = (state = [], action) => {
    switch (action.type) {
        case 'SET_JOBS':
            return action.payload;
    }
    return state;
}

const currentJob = (state = [], action)=>{
    switch (action.type){
        case `SET_CURRENT_JOB_POST`:
            return action.payload;
        case `SET_EDIT_JOB`:
            return {
                ...state,
                [action.payload.property]: action.payload.value
            };
    }
    return state;
}




export default combineReducers({
    allJobs,
    currentJob,

})