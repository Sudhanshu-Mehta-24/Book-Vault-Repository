import React, { useEffect, useState } from "react";

const Home = () => {
    // Your exact state + functions (unchanged)
    const [bookForm, setBookForm] = useState({
        BookName: "",
        BookTitle: "",
        Author: "",
        SellingPrice: "",
        PublishDate: "",
    });

    const [bookList, setBookList] = useState([]);

    const getAllbookList = async () => {
        try {
            const res = await fetch("http://localhost:8000/book/bookLists");
            const data = await res.json();
            setBookList(data?.bookList || []);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllbookList()
    }, []);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setBookForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!bookForm.BookName || !bookForm.BookTitle || !bookForm.Author || !bookForm.SellingPrice) {
            alert("All fields are required");
            return;
        }
        try {
            const res = await fetch("http://localhost:8000/book/addbook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookForm)
            });
            const data = await res.json();
            if (data?.Success) {
                alert(data?.Message);
                setBookForm({ 
                    BookName: "", BookTitle: "", Author: "", 
                    SellingPrice: "", PublishDate: "" 
                });
                getAllbookList();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteBook = async (bookId) => {
        if (!confirm('Are you sure you want to delete this book?')) return;
        try {
            const res = await fetch("http://localhost:8000/book/deletebook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ID: bookId })
            });
            const data = await res.json();
            if (data.Success) {
                alert(data.Message);
                getAllbookList();
            } else {
                alert('Delete failed: ' + data.Message);
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Delete failed');
        }
    };

    return (
        // Vintage Paper Texture Background
        <div 
            className="w-full px-5 min-h-[calc(100vh-60px)] py-8"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-2v12h2v-12h2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundColor: '#fdf7f0',
                position: 'relative'
            }}
        >
            {/* Paper-like container for your content */}
            <div className="relative bg-gradient-to-br from-amber-50 to-yellow-50 border-4 border-amber-200/50 rounded-3xl shadow-2xl p-8 max-w-6xl mx-auto">
                
                {/* Your exact form grid */}
                <div className="w-full grid grid-cols-5 gap-3 my-4 h-8 px-2">
                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="">Book Name</label>
                        <input
                            type="text"
                            placeholder="Book Name"
                            className="w-full border-2 text-gray-800 border-gray-100 rounded-sm outline-1 outline-gray-500 h-8 px-2"
                            name="BookName"
                            value={bookForm.BookName}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="">Book Title</label>
                        <input 
                            type="text"
                            placeholder="Book Title"
                            className="w-full border-2 text-gray-800 border-gray-100 rounded-sm outline-1 outline-gray-500 h-8 px-2"
                            name="BookTitle"
                            value={bookForm.BookTitle}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="">Author</label>
                        <input 
                            type="text"
                            placeholder="Author"
                            className="w-full border-2 text-gray-800 border-gray-100 rounded-sm outline-1 outline-gray-500 h-8 px-2"
                            name="Author"
                            value={bookForm.Author}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="">Selling Price</label>
                        <input 
                            type="text"
                            placeholder="Selling Price"
                            className="w-full border-2 text-gray-800 border-gray-100 rounded-sm outline-1 outline-gray-500 h-8 px-2"
                            name="SellingPrice"
                            value={bookForm.SellingPrice}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="">Publish Date</label>
                        <input 
                            type="date"
                            placeholder="Publish Date"
                            className="w-full border-2 text-gray-800 border-gray-100 rounded-sm outline-1 outline-gray-500 h-8 px-2"
                            name="PublishDate"
                            value={bookForm.PublishDate}
                            onChange={handleFormChange}
                        />
                    </div>
                </div>

                {/* Your exact submit button */}
                <div className="w-full flex justify-end">
                    <button 
                        className="bg-gray-600 text-white h-9 w-22 my-7 rounded-md cursor-pointer"
                        onClick={handleSubmit}
                    >
                        SUBMIT
                    </button>
                </div>

                {/* Your exact table */}
                <div className="w-full mt-10">
                    <div className="w-full">
                        <table className="w-full bg-white divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">BookName</th>
                                    <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">BookTitle</th>
                                    <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                                    <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SellingPrice</th>
                                    <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PublishDate</th>
                                    <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {bookList?.map((book, index) => (
                                    <tr className="hover:bg-gray-200" key={index}>
                                        <td className="px-6 py-3 whitespace-nowrap">{book?.BookName}</td>
                                        <td className="px-6 py-3 whitespace-nowrap">{book?.BookTitle}</td>
                                        <td className="px-6 py-3 whitespace-nowrap">{book?.Author}</td>
                                        <td className="px-6 py-3 whitespace-nowrap">{book?.SellingPrice}</td>
                                        <td className="px-6 py-3 whitespace-nowrap">{book?.PublishDate}</td>
                                        <td className="px-6 py-3 whitespace-nowrap">
                                            <button 
                                                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg rgb(237, 46, 46)"
                                                onClick={() => deleteBook(book._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
