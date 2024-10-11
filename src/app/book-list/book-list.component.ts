import { Component } from '@angular/core';
import { BookService } from '../shared/services/book.service';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../shared/models/book';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
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
