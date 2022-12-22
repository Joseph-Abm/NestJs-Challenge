import { Body, Controller, Put, Post, Get, Query, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.model';
import { AuthGuard } from '../guards/auth.guard';
@Serialize(UserDto)
@Controller('users')
export class UsersController {

    constructor(
        private authService: AuthService
    ) { }

    @UseGuards(AuthGuard)
    @Get('/user')
    UserInfo(@CurrentUser() user: User, @Session() session: any) {
        return user;
    }


    @Put('/signup')
    async createUser(@Body() body: CreateUserDto, @Query() query: string, @Session() session: any) {
        const user = await this.authService.signup(
            body.email,
            body.firstName,
            body.lastName,
            body.password,
            query
        );
        session.userId = user._id;
        session.role = user.role;
        return user;
    }
    @Post('/signin')
    async signInUser(@Body() body: SignInDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user._id;
        session.role = user.role;
        return user;
    }
}
