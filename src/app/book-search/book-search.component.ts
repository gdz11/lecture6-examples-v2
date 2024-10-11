import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../shared/models/book';
import { BookSearchService } from '../shared/services/book-search.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.css'
})
export class BookSearchComponent {

  books?: Promise<Book[]>;

  form = new FormGroup({
    title: new FormControl(''),
    author: new FormControl('')
  });

  onSearchBook() {
    let value = this.form.value;

    this.books = this.searchService.findBook({
      title: value.title,
      author: value.author
    })
  }


  constructor(private searchService: BookSearchService) { }

  ngOnInit(): void {
    this.onSearchBook();
  }
}
