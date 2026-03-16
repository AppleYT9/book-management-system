import { Component, OnInit } from '@angular/core';
import { BookService } from '../book';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books.html'
})
export class BooksComponent implements OnInit {

  books:any[]=[];

  bookName:string="";
  author:string="";
  price:number | null=null;

  id:any=null;
  isEditMode:boolean=false;

  constructor(private service:BookService){}

  ngOnInit(){
    this.loadBooks();
  }

  loadBooks(){
    this.service.getBooks().subscribe((data:any)=>{
      this.books=data;
    });
  }

  addBook(){

    if (!this.bookName.trim() || !this.author.trim() || this.price == null) {
      alert("Please fill all fields");
      return;
    }

    const book={
      bookName:this.bookName,
      author:this.author,
      price:this.price
    };

    this.service.addBook(book).subscribe(()=>{
      this.loadBooks();

      this.resetForm();
    });

  }

  editBook(book:any){
    this.id = book._id;
    this.bookName = book.bookName;
    this.author = book.author;
    this.price = book.price;
    this.isEditMode = true;
  }

  cancelEdit(){
    this.resetForm();
  }

  saveEdit(){
    if (!this.bookName.trim() || !this.author.trim() || this.price == null) {
      alert("Please fill all fields");
      return;
    }

    const book={
      bookName:this.bookName,
      author:this.author,
      price:this.price
    };

    this.service.updateBook(this.id, book).subscribe(()=>{
      this.loadBooks();
      this.resetForm();
    });
  }

  resetForm(){
    this.id = null;
    this.bookName = "";
    this.author = "";
    this.price = null;
    this.isEditMode = false;
  }

  deleteBook(id:any){
    this.service.deleteBook(id).subscribe(()=>{
      this.loadBooks();
    });
  }

}