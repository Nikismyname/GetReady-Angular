import { Action } from '@ngrx/store';
import { AdminActionTypes } from "../actions/admin.actions";

export function adminReducer(
    state: IAdminRedState = initialAdminState,
    action: Action,
) {
    switch (action.type) {
        case AdminActionTypes.GET_IDS_FOR_APPROVAL_SUCCESS:
            let successState = Object.assign({}, state);
            successState.idsForApproval = { ids: action["payload"], success: true };
            return successState;
        
        case AdminActionTypes.CLEAR_SUCCESSES:
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