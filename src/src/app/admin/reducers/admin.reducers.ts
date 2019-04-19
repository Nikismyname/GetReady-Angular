import { AdminActionTypes, AdminActionType, AdminActions } from "../actions/admin.actions";
//1 union
export function adminReducer(
    state: IAdminRedState = initialAdminState,
    action: AdminActionType,
) {
    switch (action.type) {
        case AdminActionTypes.GET_IDS_FOR_APPROVAL_SUCCESS:
            let successState = Object.assign({}, state);
            successState.idsForApproval = { ids: action.payload, success: true };
            return successState;
        
        case AdminActionTypes.APPROVE_QUESTION_SUCCESS:
            let approvedState = Object.assign({}, state);
            approvedState.questionApproved.success = true;
            return approvedState;

        case AdminActionTypes.CLEAR_SUCCESSES:
            let clearState = Object.assign({}, state);
            clearState.idsForApproval.success = false;
            clearState.questionApproved.success = false;
            return clearState;
        
        default:
            return state;
    }
}

export interface IAdminRedState{
    idsForApproval: {
        ids: number[],
        success: boolean,
    }
    questionApproved: {
        success: boolean;
    }
}

const initialAdminState: IAdminRedState = {
    idsForApproval: {
        ids: [],
        success: false,
    },
    questionApproved: { 
        success: false,
    }
} 