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

      this.bookName="";
      this.author="";
      this.price=null;
    });

  }

  deleteBook(id:any){
    this.service.deleteBook(id).subscribe(()=>{
      this.loadBooks();
    });
  }

}