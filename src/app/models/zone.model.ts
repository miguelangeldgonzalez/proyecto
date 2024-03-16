import { BasicModel } from "../common/constants";

export interface State extends BasicModel {
  municipalities: Municipality[];
}

export interface Municipality extends BasicModel {
  boroughs: Borough[];
}

export interface Borough extends BasicModel {}
