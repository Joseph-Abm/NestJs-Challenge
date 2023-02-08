import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, Role } from './user.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async create(email: string, firstName: string, lastName: string, password: string, query) {

        const user = new this.userModel({
            email: email.toLowerCase(),
            firstName,
            lastName,
            password
        });

        if (query.isAdmin === 'true') {
            user.role = Role.Admin;
            user.relatedComplaints = undefined;
        }
        else if (query.isVip === 'true') {
            user.role = Role.Vip;
        }

        return await user.save();
    }

    async findOneByEmail(email: string) {
        console.log(email);
        const normalizedEmail = email.toLowerCase();

        console.log(normalizedEmail);
        const user = await this.userModel.findOne({ email: normalizedEmail });
        return user;
    }

    async findOneById(id: string) {
        const user = await this.userModel.findById(id);
        return user;
    }
}

