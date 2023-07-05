import {Router} from 'express';

import {getItems} from '../controllers/machines.controller.js';

const router = Router();

router.get('/maquinas', getItems);

export default router;