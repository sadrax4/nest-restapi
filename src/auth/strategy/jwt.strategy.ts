import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private prisma: PrismaService) {
        super({
            jwtFromRequest:
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret_key'
        })
    }
    async validate(payload: {
        sub: number;
        email: string;
    }) {
        const user = await this.prisma.user.findMany(
            {
                where:
                    { email: payload.email, id: payload.sub },
                select:
                    { id: true, email: true, first_name: true, last_name: true, Bookmark: true }
            })
        return user;
    }
}