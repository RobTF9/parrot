import { Document, Model, model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  checkPassword: (password: string) => boolean;
}

const userSchema = new Schema<UserDocument, Model<UserDocument>>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (error, same) => {
      if (error) {
        reject(error);
      }
      resolve(same);
    });
  });
};

const User = model('user', userSchema);

export default User;
