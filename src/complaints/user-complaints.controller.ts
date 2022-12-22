import { Controller, Get, Put, Session, Body, UseGuards, Param } from '@nestjs/common';
import { CreateComplaintDto } from './dtos/create-complaint.dto';
import { ComplaintsService } from './complaints.service';
import { ClientGuard } from '../guards/client.guard';
import { SessionDto } from '../dtos/session.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ComplaintDto } from './dtos/complaint.dto';
import { Types } from 'mongoose';


@Controller('complaints/user')
@UseGuards(ClientGuard)
export class UserComplaintsController {

    constructor(
        private complaintsService: ComplaintsService,
    ) { }

    @Put()
    submitComplaint(@Body() body: CreateComplaintDto, @Session() session: SessionDto) {
        return this.complaintsService.createComplaint(body, session.userId);
    }

    @Get()
    @Serialize(ComplaintDto)
    fetchAllComplaints(@Session() session: SessionDto) {
        return this.complaintsService.getUserComplaints(session.userId);
    }

    @Get('/:id')
    @Serialize(ComplaintDto)
    fetchSingleComplaint(@Param('id') complaintId: Types.ObjectId) {
        return this.complaintsService.getSingleComplaint(complaintId);
    }

}
