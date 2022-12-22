import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
@Module({
    imports: [
        MongooseModule.forFeature(
            [{
                name: 'User',
                schema: UserSchema
            }]
        )
    ],
    providers: [UsersService, AuthService,
        {
            provide: APP_INTERCEPTOR,
            useClass: CurrentUserInterceptor
        }
    ],
    controllers: [UsersController]
})
export class UsersModule { }
