import { v2 } from '@google-cloud/translate';
import { Router, RequestHandler } from 'express';
import config from '../../config';
import { lexiconActive } from '../auth/auth.middleware';

const CREDENTIALS =
  config.transationCreds && JSON.parse(config.transationCreds);

const translate = new v2.Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});

export const translateController: RequestHandler = async (req, res, next) => {
  try {
    const response = await translate.translate(req.body, {
      from: req.session.lexicon?.language.htmlCode,
      to: 'en',
    });

    return res.status(200).json({ data: response });
  } catch (error) {
    return next(new Error(error));
  }
};

const router = Router();
router.use(lexiconActive);
router.route('/').post(translateController);

export default router;
