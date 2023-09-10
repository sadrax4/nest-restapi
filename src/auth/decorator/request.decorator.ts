import { ExecutionContext, HttpCode, Post, applyDecorators, createParamDecorator, Request } from '@nestjs/common';
import { ApiResponse, ApiTags } from "@nestjs/swagger"

export function singinDecorator() {
    return applyDecorators(
        ApiTags("auth"),
        ApiResponse({ status: 201, description: "user created successfully" }),
        ApiResponse({ status: 403, description: "internal server error" }),
        Post('signup'),
        HttpCode(201),
    )
}
export function singupDecorator() {
    return applyDecorators(
        ApiTags("auth"),
        ApiResponse({ status: 201, description: "user created successfully" }),
        ApiResponse({ status: 403, description: "internal server error" }),
        Post('signin'),
        HttpCode(200)
    )
}
export const GetUser = createParamDecorator(
    (
        data: string | undefined,
        ctx: ExecutionContext
    ) => {
        const request: Express.Request = ctx.switchToHttp().getRequest();
        if (data) {
            return request.user[data];
        }
        return request.user;

    })