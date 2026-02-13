import express from 'express';
import mainController from './controllers/main.controller.js';
import catalogController from './controllers/catalog.controller.js';
import adminController from './controllers/admin.controller.js';

const router = express.Router();

// router.METHOD_HTTP("SCHEMA_URL", CONTROLLER.METHOD);

router.get("/", mainController.homePage);
router.get("/catalogue", catalogController.catalogList);
router.get("/catalogue/:id", catalogController.catalogProduct);
router.get("/boutique", mainController.boutiquePage);
router.get("/admin/add", adminController.adminPage);
router.post("/admin/add", adminController.addCoffee);

export default router;