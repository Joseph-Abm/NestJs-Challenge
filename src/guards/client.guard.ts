import {
    CanActivate,
    ExecutionContext
} from '@nestjs/common';

export class ClientGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        return request.session.role === "Regular" || request.session.role === "Vip";
    }
}