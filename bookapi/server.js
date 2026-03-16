const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/Books")
.then(() => console.log("Connected to MongoDB: Books"))
.catch(err => console.log(err));

const BookSchema = new mongoose.Schema({
  bookName: String,
  author: String,
  price: Number
});

const Book = mongoose.model("types", BookSchema);

app.get("/", (req,res)=>{
  res.send("Book API running");
});

app.post("/books", async(req,res)=>{
  try{
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.json(savedBook);
  }
  catch(error){
    res.status(500).json({message:error.message});
  }
});

app.get("/books", async(req,res)=>{
  try{
    const books = await Book.find();
    res.json(books);
  }
  catch(error){
    res.status(500).json({message:error.message});
  }
});

app.put("/books/:id", async(req,res)=>{
  try{
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new:true }
    );
    res.json(updatedBook);
  }
  catch(error){
    res.status(500).json({message:error.message});
  }
});

app.delete("/books/:id", async(req,res)=>{
  try{
    await Book.findByIdAndDelete(req.params.id);
    res.json({message:"Book deleted successfully"});
  }
  catch(error){
    res.status(500).json({message:error.message});
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
});