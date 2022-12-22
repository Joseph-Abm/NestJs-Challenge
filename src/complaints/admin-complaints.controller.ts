import { Controller, Get, Patch, Body, UseGuards, Param, Query } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { Types } from 'mongoose';
import { AdminGuard } from 'src/guards/admin.guard';
import { UpdateComplaintDto } from './dtos/update-complaint.dto';

@Controller('complaints/admin')
@UseGuards(AdminGuard)
export class AdminComplaintsController {

    constructor(
        private complaintsService: ComplaintsService,
    ) { }

    @Patch('/:id')
    updateStatus(@Body() body: UpdateComplaintDto, @Param('id') complaintId: Types.ObjectId) {
        return this.complaintsService.updateStatus(complaintId, body.status);
    }

    @Get()
    fetchAllComplaints(@Query('isFiltered') isFiltered) {
        return this.complaintsService.getComplaints(isFiltered);
    }

    //this is for testing purpose to see the complaint ids without manually accessing the DB
    @Get('/id')
    fetchAllComplaintsWithId() {
        return this.complaintsService.getComplaintsWithId();
    }
}