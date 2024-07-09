const express = require("express");
const itemController = require("../controllers/item");

const { verify } = require("../auth");

const router = express.Router();

router.post("/", verify, itemController.addItem);
router.get("/", verify, itemController.getAllItems);
router.get("/:id", verify, itemController.getItemById);
router.put("/:id", verify, itemController.updateItem);
router.delete("/:id", verify, itemController.deleteItem);


module.exports = router;