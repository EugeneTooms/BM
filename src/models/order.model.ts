export class Order{
    constructor(public id : number,
                public naziv : string,
                public qty : number,
                public box_qty : number,
                public boxes?: number,
                public boce? : number,
                public img? : string,
                public supplier_id? : number) {}
}