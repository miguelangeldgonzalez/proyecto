import { State } from "./zone.model";

export type UserLogin = {
  email: string;
  password: string;
}

export type Role = {
  id: number;
  name: Roles;
}

export type LoggedUser = {
  id: number;
  email: string;
  name: string;
  accessToken: string;
  ubdatedAt: Date;
  createdAt: Date;
  role: Role;
  states: Array<State>
}

export enum Roles {
  ADMIN = 'ADMIN',
  STATE_MANAGER = 'STATE_MANAGER',
  VOLUNTEER = 'VOLUNTEER'
}
