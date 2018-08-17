import { ArtikalPrimka } from "./artikalprimka.model";

export class Primka{
    constructor(public id : number,
                public number : string,
                public supplier : string,
                public date : string,
                public artikli : ArtikalPrimka[]) {}
}