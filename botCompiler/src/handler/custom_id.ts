import {CustmIdFunction } from '../types'
export class Custom_id {
    id;
    run;
    constructor(
        id:string,
        run: CustmIdFunction
    ){
        this.id = id,
        this.run = run
    }
}