import { Component } from '@angular/core';
import { BookListComponent } from "./book-list/book-list.component";
import { BookSearchComponent } from './book-search/book-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BookListComponent, BookSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lecture6-examples-v2';
}
