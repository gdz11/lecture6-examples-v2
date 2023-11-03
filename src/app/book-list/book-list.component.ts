import { Component, OnInit, inject } from '@angular/core';
import { Book } from '../shared/models/book';
import { BookService } from '../shared/services/book.service';
import { FormGroup, FormControl, Validators, AsyncValidatorFn, AbstractControl } from '@angular/forms'




@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  titleUniqueValidator: AsyncValidatorFn = (contorl: AbstractControl) => {
    const value = contorl.value;
    let result = this.booksService.checkBookExists(value).then(c => {
      if (c) {
        return { 'titleUnique2': false }
      }
      else {
        return null;
      }
    });

    return result;
  }

  form = new FormGroup({
    title: new FormControl('', [Validators.required], [(c) => this.titleUniqueValidator(c)]),
    author: new FormControl('', [Validators.required])
  });

  books: Book[] = [];

  books2?: Promise<Book[]>;

  onAddBook() {
    let value = this.form.value;
    if (this.form.valid) {
      this.booksService.addBook({
        id: '',
        title: value.title!,
        author: value.author!
      });
      this.form.reset();
      this.refresh();
    }

  }

  refresh() {
    this.booksService.getBooks().then(d => {
      this.books = d;
    });
  }


  constructor(private booksService: BookService) { }

  ngOnInit(): void {
    this.booksService.getBooks().then(d => {
      this.books = d;
    });

    this.books2 = this.booksService.getBooks();
  }

}
