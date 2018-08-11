export class OrderArtikal{
    constructor(public id : number,
                public naziv : string,
                public kolicina: number,
                public kalo? : number,
                public paketi?: number,
                public boce? : number,
                public img? : string,
                public supplier_id? : number) {}
}