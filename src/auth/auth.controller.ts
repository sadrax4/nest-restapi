import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { singinDecorator, singupDecorator } from './decorator/request.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authservice: AuthService) { }

    @singinDecorator()
    signup(@Body() dto: AuthDto) {
        return this.authservice.signin(dto);
    }

    @singupDecorator()
    signin(@Body() dto: AuthDto) {
        return this.authservice.signup(dto);
    }
}