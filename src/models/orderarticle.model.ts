export class OrderArtikal{
    constructor(public id : number,
                public naziv : string,
                public kolicina: number,
                public box_qty: number,
                public qty? : number,
                public paketi?: number,
                public boce? : number,
                public img? : string,
                public supplier_id? : number) {}
}