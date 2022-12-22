import { Test, TestingModule } from '@nestjs/testing';
import { UserComplaintsController } from './user-complaints.controller';

describe('UserComplaintsController', () => {
    let controller: UserComplaintsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserComplaintsController],
        }).compile();

        controller = module.get<UserComplaintsController>(UserComplaintsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
