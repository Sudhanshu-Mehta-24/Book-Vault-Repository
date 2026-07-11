const { Book } = require("../model/book.model");

const handleBookStoreController = async (req, res) => {
    try {
        const body = req.body;

        if (!body.BookName || !body.BookTitle || !body.Author || !body.SellingPrice) {
            return res.status(400).json({ Message: "All field's are required", Success: false });
        }

        const bookAdd = await Book.insertOne(body);

        if (bookAdd) {
            return res.status(201).json({ Message: "Data created successfully !", Success: true, ID:bookAdd?._id});
        }

        console.log("bookAdd", bookAdd);
    } catch (error) {
        return res.status(500).json({ Message: error.message, Success: false, ID: bookAdd?._id });
    }
};

const handleBookListController = async (req, res) => {
    try {
        const bookList = await Book.find({});
        return res.status(200).json({ Message: "All books fetched successfully !", Success: true, TotalCount: bookList.length, bookList: bookList });
    } catch (error) {
        return res.status(400).json({ Message: error.message, Success: false });
    }
};

const handleBookDeleteController = async (req, res) => {
    try {
        const { ID } = req.body;  // ✅ Destructure ID
        if (!ID) {
            return res.status(400).json({ Message: "Book ID required", Success: false });
        }

        const deleted = await Book.findByIdAndDelete(ID);  // ✅ Fixed: findByIdAndDelete()
        
        if (!deleted) {
            return res.status(404).json({ Message: "Book not found", Success: false });
        }
        
        return res.json({ Message: "Book deleted successfully !", Success: true });

    } catch (error) {
        return res.status(500).json({ Message: error.message, Success: false });  // ✅ 500 for server errors
    }
};

module.exports = { handleBookStoreController, handleBookListController, handleBookDeleteController};