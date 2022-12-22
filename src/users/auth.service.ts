import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async signup(email: string, firstName: string, lastName: string, password: string, query: String) {

        const existingUser = await this.usersService.findOneByEmail(email);
        if (existingUser) {
            throw new BadRequestException('email already in use!');
        }

        const hashedPassword = await hash(password, 12);

        const user = await this.usersService.create(email, firstName, lastName, hashedPassword, query);

        return user;
    }

    async signin(email: string, password: string) {

        const user = await this.usersService.findOneByEmail(email);

        if (!user) {
            throw new NotFoundException('email not found!');
        }

        const matchedPw = await compare(password, user.password);

        if (!matchedPw) {
            throw new BadRequestException('password not authenticated!');
        }

        return user;
    }
}