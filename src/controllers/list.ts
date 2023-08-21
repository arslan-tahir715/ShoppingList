import { Request, Response } from 'express';
import { createList, getListById, getSharedList } from "../db/list";

export const shareShopingList = async (req: Request, res: Response) => {
  try {
    const { userId, listId, sharedWith, permission } = req.body;

    const list = await getListById(listId);

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    if (list.userId.toString() !== userId) {
      return res.status(403).json({ message: "Permission denied" });
    }

    list.sharedWith.push({ sharedUserId: sharedWith, permission });
    await list.save();

    return res.status(200).json({ message: "List shared successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const viewShopingList = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const sharedLists = await getSharedList(userId);
    return res.status(200).json(sharedLists);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const createShopingList = async (req: Request, res: Response) => {
  try {
    const { userId, listName, shareWith, permission } = req.body;
    console.log(req.body);
    const newList = createList({
      userId,
      listName,
      sharedWith: [{
        sharedUserId: shareWith,
        permission: permission
      }],
    });
    return res.status(200).json(newList).end();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
