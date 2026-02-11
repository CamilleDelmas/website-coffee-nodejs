import express from 'express';
import mainController from './controllers/main.controller.js';
import catalogController from './controllers/catalog.controller.js';

const router = express.Router();

// router.METHOD_HTTP("SCHEMA_URL", CONTROLLER.METHOD);

router.get("/", mainController.homePage);
router.get("/catalogue", catalogController.catalogList);
router.get("/catalogue/:id", catalogController.catalogProduct);
router.get("/boutique", mainController.boutiquePage)

export default router;