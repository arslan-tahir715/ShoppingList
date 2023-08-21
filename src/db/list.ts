import { Schema, model } from "mongoose";

const listSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  listName: {
    type: String,
    required: true
  },
  sharedWith: [
    {
      sharedUserId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      permission: { type: String, enum: ["read", "write"], required: true },
    },
  ],
});

export const ListModel = model("List", listSchema);

export const getListById = (id: string) => ListModel.findById(id);
export const getSharedList = (userId: string) =>
  ListModel.find({
    "sharedWith.sharedUserId": userId,
  });
export const createList = (values: any) =>
  new ListModel(values).save().then((list) => list.toObject());