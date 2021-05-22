import {
  Document,
  Model,
  model,
  Schema,
  ObjectId,
  SchemaTypes,
} from 'mongoose';

interface NotificationDocument extends Document {
  sender: ObjectId;
  recipient: ObjectId;
  url: string;
  read: boolean;
  message: string;
}

const notificationSchema = new Schema<
  NotificationDocument,
  Model<NotificationDocument>
>(
  {
    sender: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'user',
    },
    recipient: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'user',
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
    message: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Notification = model<NotificationDocument>(
  'notification',
  notificationSchema
);

export default Notification;
