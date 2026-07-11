const express = require("express");
const { handleBookStoreController, handleBookListController,
     handleBookDeleteController } = require("../controller/book.controller")

const router = express.Router();

//http://localhost:8000/book/addbook
router.post("/addbook", handleBookStoreController);
router.get("/bookLists", handleBookListController);
router.post("/deletebook", handleBookDeleteController);

module.exports = router