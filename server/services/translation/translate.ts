import { v2 } from '@google-cloud/translate';
import { Router, RequestHandler } from 'express';
import config from '../../config';
import { parrotActive } from '../auth/auth.middleware';

const CREDENTIALS =
  config.transationCreds && JSON.parse(config.transationCreds);

const translate = new v2.Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});

export const translateController: RequestHandler = async (req, res, next) => {
  try {
    const response = await translate.translate([...req.body], {
      from: req.session.parrot?.language.htmlCode,
      to: 'en',
    });

    return res
      .status(200)
      .json({ data: response[0].map((lang, i) => [lang, req.body[i]]) });
  } catch (error) {
    return next(error);
  }
};

const router = Router();
router.use(parrotActive);
router.route('/').post(translateController);

export default router;
