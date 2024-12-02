import { Type } from "class-transformer"
import { IsInt } from "class-validator"

export class AddToyToChild {

    constructor(child_id, toy_id) {
        this.child_id = child_id,
        this.toy_id = toy_id
    }

    @IsInt()
    @Type(() => Number)
    readonly child_id : number

    @IsInt()
    @Type(() => Number)
    readonly toy_id : number
}