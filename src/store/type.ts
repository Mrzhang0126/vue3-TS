import { IloginState } from './login/type';
import { ISystemState } from './main/system/type';

export interface IRootState {
  entireDepartment: any[];
  entireRole: any[];
  entireMenu: any[];
}

interface IRootWithModule {
  login: IloginState;
  system: ISystemState;
}

export type IStoreType = IRootState & IRootWithModule;
