import { Coordinate } from "./coordinate";

export interface Pdf {
    id: number;
    name: string;
    coordinates: Coordinate[];
    data: string;
}
