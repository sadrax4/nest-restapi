import { IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class EditUser {

    @IsString()
    @MinLength(2)
    @MaxLength(10)
    @IsNotEmpty()
    first_name: string


    @IsString()
    @MinLength(2)
    @MaxLength(10)
    @IsNotEmpty()
    last_name: string
}
