import express from 'express';
import request from 'supertest'; 
import { shareShopingList } from '../src/controllers/list'; 

const app = express();
app.use(express.json());
app.use('/', shareShopingList);

describe('shareShopingList', () => {
    it('should share a shopping list successfully', async () => {
        const mockListId = 'mockListId123';
        const mockUserId = 'mockUserId123';
        const mockSharedWith = 'sharedUser@example.com';
        const permission = 'read';
        const sharedUserId = 'mockUserId123';

        const mockList = {
					_id: mockListId,
					userId: mockUserId,
					sharedWith: [{
							sharedUserId,
							permission
					}],
					save: jest.fn(),
        };

        const response = await request(app)
					.post('/shareshopinglist')
					.send({
							userId: mockUserId,
							listId: mockListId,
							sharedWith: mockSharedWith,
							permission: permission,
					});

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('List shared successfully');
        expect(mockList.sharedWith).toHaveLength(1);
        expect(mockList.sharedWith[0].sharedUserId).toBe(mockSharedWith);
        expect(mockList.sharedWith[0].permission).toBe(permission);
        expect(mockList.save).toHaveBeenCalled();
    });

    it('should return 404 if list is not found', async () => {
        const response = await request(app)
					.post('/share-shopping-list')
					.send({
							userId: 'mockUserId123',
							listId: 'nonExistentListId',
							sharedWith: 'sharedUser@example.com',
							permission: 'read',
					});

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('List not found');
    });
});
