import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  api="http://localhost:3001/books";

  constructor(private http:HttpClient){}

  getBooks(){
    return this.http.get(this.api);
  }

  addBook(data:any){
    return this.http.post(this.api,data);
  }

  deleteBook(id:any){
    return this.http.delete(this.api+"/"+id);
  }

  updateBook(id:any, data:any){
    return this.http.put(this.api+"/"+id, data);
  }

}