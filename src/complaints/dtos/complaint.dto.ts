import { Types } from "mongoose";
import { Expose } from "class-transformer";
import { status } from "../complaint.model";

export class ComplaintDto {
    @Expose()
    id: Types.ObjectId;

    @Expose()
    title: string;

    @Expose()
    body: string;

    @Expose()
    status: status;
}