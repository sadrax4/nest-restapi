import { Body, Controller, Get, Post, Res, Response, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../auth/guard/auth.guard";
import { UserService } from './user.service';
import { GetUser } from "src/auth/decorator/request.decorator";
import { User } from "@prisma/client";
import { EditUser } from "./dto";

@UseGuards(JwtGuard)
@Controller("user")
export class UserController {
    constructor(private userService: UserService) { }
    @Get("profile")
    profile(@GetUser() user: User): User {
        return user;
    }

    @Post("edit")
    editProfile(@Body() dto: EditUser, @GetUser() user: User) {
        return this.userService.editUser(dto, user.id);
    }

    @Get("list")
    getUserList() {
        return this.userService.getUserList()
    }

}