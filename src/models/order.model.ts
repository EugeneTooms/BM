export class Order{
    constructor(public id : number,
                public naziv : string,
                public kalo : number,
                public boxes?: number,
                public boce? : number,
                public img? : string,
                public supplier_id? : number) {}
}