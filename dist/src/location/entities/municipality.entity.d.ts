import { State } from './state.entity';
import { Borough } from './borough.entity';
export declare class Municipality {
    id: number;
    name: string;
    state: State;
    boroughs: Borough[];
}
