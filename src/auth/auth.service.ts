import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2"
import { PrismaClientKnownRequestError, } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
@Injectable({})

export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) { }
    async signin(dto: AuthDto): Promise<{ msg: string }> {
        try {
            const hashPassword = await argon.hash(dto.password);
            const userData = {
                email: dto.email,
                password: hashPassword
            }
            await this.prisma.user.create({ data: userData });
            return { msg: "user created successfully" };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError)
                if (error.code == "P2002") {
                    throw new ForbiddenException("email has been already registered")
                }
            throw error
        }
    }
    async signup(dto: AuthDto): Promise<string> {
        const user = await this.prisma.user.findFirst({ where: { email: dto.email } });
        if (!user) throw new NotFoundException({ msg: "user not found" });
        const pwCompare = await argon.verify(user.password, dto.password);
        if (!pwCompare) throw new ForbiddenException("email or password is invalid");
        return this.singToken(user.id, user.email);
    }
    async singToken(userId: number, userEmail: string) {
        const payload = {
            sub: userId,
            email: userEmail
        };
        const token = await this.jwt.signAsync(payload, {
            expiresIn: "1h"
        });
        return token
    }
} 