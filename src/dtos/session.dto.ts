import { IsString } from 'class-validator';
import { Types } from 'mongoose';


export class SessionDto {

    @IsString()
    userId: Types.ObjectId;

    @IsString()
    role: string;

}