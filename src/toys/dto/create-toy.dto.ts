import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateToyDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string
    
    @IsString()
    @IsNotEmpty()
    readonly material: any

    @IsNumber()
    @IsNotEmpty()
    readonly weight: number
}
