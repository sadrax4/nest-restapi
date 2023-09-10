import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    @ApiProperty({ example: "email@email.com" })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: "myPassword" })
    @IsString()
    @IsNotEmpty()
    password: string

}