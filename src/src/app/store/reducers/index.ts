import { IAuthState } from 'src/app/authentication/reducers';
import { IGlobalState } from 'src/app/global/reducers';
import { ICrudState } from 'src/app/crud/reducers';
import { IPersonalState } from 'src/app/personal/reducers';
import { IAdminState } from 'src/app/admin/reducers';

export interface IAppState extends
    IAuthState,
    IGlobalState,
    ICrudState,
    IPersonalState,
    IAdminState
{}