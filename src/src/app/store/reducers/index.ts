import { IAuthState } from 'src/app/authentication/reducers';
import { IGlobalState } from 'src/app/global/reducers';
import { ICrudState } from 'src/app/crud/reducers';

export interface IAppState extends IAuthState, IGlobalState, ICrudState{
}