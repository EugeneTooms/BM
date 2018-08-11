export class Artikal{
    constructor(public id : number,
                public inventory_id : number,
                public lokacija_id : number,
                public indeks : number,
                public naziv : string,
                public img? : string,
                public kolicina? : number) {}
}