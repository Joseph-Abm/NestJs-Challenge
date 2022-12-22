import { IsEnum } from 'class-validator';
import { status } from '../complaint.model';


export class UpdateComplaintDto {

    @IsEnum(status)
    status: status;

}