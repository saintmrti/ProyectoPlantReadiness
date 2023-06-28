import {Router} from 'express';

import {getItems} from '../controllers/headings.controller.js';

const router = Router();

router.get('/rubros', getItems);

export default router;