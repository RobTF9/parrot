import env from 'dotenv';

env.config();

export default {
  speechRegion: process.env.SPEECH_REGION,
  speechEndpoint: process.env.SPEECH_ENDPOINT,
  speechToken: process.env.SPEECH_TOKEN,
};
