import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      hidden: true,
    },
    active: Boolean,
    deletedAt: Date,
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

export interface IUser extends Document {
  name: string;
  password?: string;
  email: string;
  active: boolean;
  authenticate: (plainTextPassword: string) => boolean;
  encryptPassword: (password: string | undefined) => string;
}

UserSchema.pre<IUser>('save', function encryptPasswordHook(next) {
  if (this.isModified('password')) {
    this.password = this.encryptPassword(this.password);
  }

  return next();
});

UserSchema.methods = {
  authenticate(plainTextPassword: string) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  },
  encryptPassword(password: string) {
    return bcrypt.hashSync(password, 8);
  },
};

const UserModel: Model<IUser> = mongoose.model('User', UserSchema);
export default UserModel;
