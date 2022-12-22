import { Injectable, NotFoundException } from '@nestjs/common';
import { Complaint } from './complaint.model';
import { User } from '../users/user.model';
import { InjectModel, } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateComplaintDto } from './dtos/create-complaint.dto';

@Injectable()
export class ComplaintsService {
    constructor(@InjectModel('Complaint') private complaintModel: Model<Complaint>,
        @InjectModel('User') private userModel: Model<User>) { }

    async createComplaint(complaintDto: CreateComplaintDto, userId: Types.ObjectId) {
        const complaint = new this.complaintModel({
            title: complaintDto.title,
            body: complaintDto.body,
            creator: userId
        });

        await this.userModel.findOneAndUpdate({ _id: userId }, { $push: { relatedComplaints: complaint._id } });

        return await complaint.save();
    }

    async getUserComplaints(userId: Types.ObjectId) {
        const complaints = await this.complaintModel.find({ creator: userId });
        return complaints;
    }

    async getSingleComplaint(complaintId: Types.ObjectId) {
        const complaint = await this.complaintModel.findById(complaintId);
        if (!complaint) {
            throw new NotFoundException('complaint not found!');
        }
        return complaint;
    }

    async updateStatus(complaintId: Types.ObjectId, status: string) {
        const complaint = await this.complaintModel.updateOne({ _id: complaintId }, { $set: { "status": status } });
        return complaint;
    }

    async getComplaints(isFiltered: string) {

        let complaints = { vip: [], nonVip: [] };

        const lookup = { '$lookup': { 'from': 'users', 'localField': 'creator', 'foreignField': '_id', 'as': 'user' } };
        const unwind = { '$unwind': { 'path': '$user' } };
        const addFieldsUser = { '$addFields': { 'priority': { '$cond': { 'if': { '$eq': ['$user.role', 'Vip'] }, 'then': 0, 'else': 1 } } } };
        const bucketAuto = { '$bucketAuto': { 'groupBy': '$priority', 'buckets': 2, 'output': { 'users': { '$push': { 'title': '$title', 'body': '$body', 'createDate': '$createdAt', 'status': '$status', 'user': '$user' } } } } };
        const project = { '$project': { '_id': 0, 'users.user._id': 0, 'users.user.password': 0, 'users.user.relatedComplaints': 0, 'users.user.role': 0, 'users.user.__v': 0 } };

        const addFieldsStatus = { '$addFields': { 'statusOrder': { '$indexOfArray': [['PENDING', 'INPROGRESS', 'RESOLVED', 'REJECTED'], '$status'] } } };

        let fetchedcomplaints;

        if (isFiltered === 'true') {
            fetchedcomplaints = await this.complaintModel.aggregate([lookup, unwind, addFieldsUser, addFieldsStatus, { '$sort': { 'statusOrder': 1, 'createdAt': -1 } }, bucketAuto, project]);
        }
        else {
            fetchedcomplaints = await this.complaintModel.aggregate([lookup, unwind, addFieldsUser, { '$sort': { 'createdAt': -1 } }, bucketAuto, project]);
        }

        complaints.vip = fetchedcomplaints[0].users;
        complaints.nonVip = fetchedcomplaints[1].users;

        return complaints;
    }

    //for testing purposes
    async getComplaintsWithId() {
        const project = { '$project': { 'title': 1, 'status': 1, 'createdAt': 1, 'creator': 1 } };

        const complaints = await this.complaintModel.aggregate([project]);
        return complaints;
    }

}
