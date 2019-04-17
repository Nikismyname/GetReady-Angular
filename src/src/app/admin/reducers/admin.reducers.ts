import { AdminActionTypes, AdminActionType } from "../actions/admin.actions";
//1
export function adminReducer(
    state: IAdminRedState = initialAdminState,
    action: AdminActionType,
) {
    switch (action.type) {
        case AdminActionTypes.GET_IDS_FOR_APPROVAL_SUCCESS:
            action.payload;
            let successState = Object.assign({}, state);
            successState.idsForApproval = { ids: action["payload"], success: true };
            return successState;
        
        case AdminActionTypes.CLEAR_SUCCESSES:
            action.payload;
            let clearState = Object.assign({}, state);
            clearState.idsForApproval.success = false;
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
}

const initialAdminState: IAdminRedState = {
    idsForApproval: {
        ids: [],
        success: false,
    }
} 