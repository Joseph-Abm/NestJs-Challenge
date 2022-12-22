import { Module } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ComplaintSchema } from './complaint.model';
import { UserSchema } from '../users/user.model';
import { UserComplaintsController } from './user-complaints.controller';
import { AdminComplaintsController } from './admin-complaints.controller';

@Module({
    imports: [
        MongooseModule.forFeature(
            [{
                name: 'Complaint',
                schema: ComplaintSchema
            }]
        ),
        MongooseModule.forFeature(
            [{
                name: 'User',
                schema: UserSchema
            }]
        )
    ],
    providers: [ComplaintsService],
    controllers: [UserComplaintsController, AdminComplaintsController]
})
export class ComplaintsModule { }
