import { IsBoolean, IsNotEmpty, IsString } from "class-validator"

export class CreateChildDto {

    @IsNotEmpty()
    @IsString()
    readonly name : string
    
    @IsNotEmpty()
    @IsString()
    readonly address : string
    
    @IsNotEmpty()
    @IsBoolean()
    readonly behaved : boolean
}
