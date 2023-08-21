import express from 'express';
import { login, register } from '../controllers/user';
import { createShopingList, shareShopingList, viewShopingList } from '../controllers/list';
import { verifyToken } from '../helpers/index';

export const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/shareshopinglist', verifyToken, shareShopingList);
router.post('/viewShopingList', verifyToken, viewShopingList);
router.post('/createShopingList', verifyToken, createShopingList);

