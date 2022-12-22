import { Types } from "mongoose";
import { Expose } from "class-transformer";

export class UserDto {
    @Expose()
    id: Types.ObjectId;

    @Expose()
    email: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    role: string;
}