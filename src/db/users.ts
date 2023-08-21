import { Schema, model, Model } from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
  authentication: {
    sessionToken: string;
  };
}

interface IUserModel extends Model<IUser> {
  getUsers: () => Promise<IUser[]>;
  getUserByEmail: (email: string) => Promise<IUser | null>;
  getUserById: (id: string) => Promise<IUser | null>;
  getUserByPassword: (password: string) => Promise<IUser | null>;
  createUser: (values: Record<string, any>) => Promise<IUser>;
  deleteUserById: (id: string) => Promise<IUser | null>;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  authentication: {
    sessionToken: {
      type: String,
      select: false,
    },
  },
});

export const UserModel: IUserModel = model<IUser, IUserModel>("User", userSchema);

UserModel.getUsers = () => UserModel.find();
UserModel.getUserByEmail = (email: string) => UserModel.findOne({ email });
UserModel.getUserById = (id: string) => UserModel.findById(id);
UserModel.getUserByPassword = (password: string) =>
  UserModel.findOne({ password });
UserModel.createUser = (values: Record<string, any>) =>
  new UserModel(values).save();
UserModel.deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

export default UserModel;