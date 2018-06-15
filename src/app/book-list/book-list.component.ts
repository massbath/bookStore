import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {BooksService} from '../services/books.service';
import {Book} from '../models/book.model';


/**
* Composant affichant la liste des livres contenues dans la bibiliothéque,
* en cliquant sur un des items on est redirigé vers le détail du livre.
* Un bouton de suppression permet de retirer le livre de la collection
**/
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit ,OnDestroy{

  books: Book[];
  booksSubscription : Subscription;

  constructor(private booksService: BooksService, private router: Router ) { }

  ngOnInit() {

    //Souscription su subject pour mettre à jour la liste à chaque modification du service
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books : Book[]) =>{
        this.books = books;
      }
    );

    //On initialise le listener du service qui permet de mettre à jour la collection à chaque changement dessus
    this.booksService.getBooks();
    this.booksService.emitBooks();
  }

  onNewBook(){
    this.router.navigate(['/books','new']);
  }

  onDeleteBook(book : Book){
    this.booksService.removeBook(book);
  }

  onViewBook(id: number){
    this.router.navigate(['/books','view',id]);
  }

  ngOnDestroy(){
    this.booksSubscription.unsubscribe();
  }

}
