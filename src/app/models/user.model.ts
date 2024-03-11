import { Role } from "./auth.model";
import { State } from "./zone.model";

export interface GetUserDTO {
    name: string;
    email: string;
    id: number;
    role: Role;
    states: Array<State>;
}


export interface GetDisplayUserDTO extends GetUserDTO {
    stateNames: string;
    roleName: string;
}


export interface CreateUserDTO {
  states: number[];
  name: string;
  email: string;
  roleId: number;
}
