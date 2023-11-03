import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { v4 as uuidv4, v4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  books: Book[];

  checkBookExists(title: string){
    let result = this.books.some(c => c.title == title);

    return Promise.resolve(result);
  }

  getBooks(){
    return Promise.resolve(this.books);
  }

  addBook(book: Book){
    book.id = uuidv4();
    this.books.push({... book});
  }

  constructor() {
    this.books = [
      {
        id: v4(),
        title: 'Book 1',
        author: 'Author 1'
      },
      {
        id: v4(),
        title: 'Book 2',
        author: 'Author 2'
      },
      {
        id: v4(),
        title: 'Book 3',
        author: 'Author 3'
      }
    ];
  }
}
