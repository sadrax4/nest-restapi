import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { User } from "@prisma/client";
import { EditUser } from "./dto";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }
    async editUser(dto: EditUser, userID: number): Promise<{ msg: string }> {
        try {
            await this.prisma.user.update({
                where: {
                    id: userID
                },
                data: {
                    first_name: dto.first_name,
                    last_name: dto.last_name
                }
            })
            return { msg: "user updated successfully" }
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError)
                if (error.code === 'P2025')
                    throw new InternalServerErrorException("Update failed");
        }
    }
    async getUserList(): Promise<User[]> {
        const users = await this.prisma.user.findMany();
        users.map(user => {
            delete user.password;
        })
        return users;
    }
}