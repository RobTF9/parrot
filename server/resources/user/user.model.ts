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
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  checkPassword: (password: string) => boolean;
  token?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  role: 'overlord' | 'teacher';
  getPublicFields: () => {
    username: string;
    email: string;
    role?: string;
    createdAt: Date;
    updatedAt: Date;
    _id: string;
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
    role: {
      type: String,
      enum: ['overlord', 'teacher'],
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

userSchema.methods.getPublicFields = function () {
  return {
    username: this.username,
    email: this.email,
    _id: this._id,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
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
