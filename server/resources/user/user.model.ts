import {
  Document,
  Model,
  model,
  ObjectId,
  Schema,
  SchemaTypes,
} from 'mongoose';
import bcrypt from 'bcryptjs';

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  checkPassword: (password: string) => boolean;
  token?: ObjectId;
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
      type: SchemaTypes.ObjectId,
      ref: 'token',
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
    next();
  }

  bcrypt.hash(this.password, 8, (error, hash) => {
    if (error) {
      next(error);
    }

    this.password = hash;
    next();
  });
});

const User = model('user', userSchema);

export default User;
