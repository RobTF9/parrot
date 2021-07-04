import { Document, Model, model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  checkPassword: (password: string) => boolean;
  token?: {
    value: string;
    createdAt: number;
  };
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
    token: {
      value: {
        type: String,
      },
      createdAt: {
        type: Date,
        index: { expires: 60 },
      },
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

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    console.log('Should be here');
    next();
  }

  bcrypt.hash(this.password, 8, (error, hash) => {
    if (error) {
      next(error);
    }

    console.log('Is instead here');
    this.password = hash;
    next();
  });
});

const User = model('user', userSchema);

export default User;
