import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Book} from '../models/book.model';
import * as firebase from 'firebase';




/**
* Service de gestion des livres et de leur persistence
**/
@Injectable()
export class BooksService {
  books : Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() {}

  emitBooks(){
    this.booksSubject.next(this.books);
  }


  /**
  * Méthode de sauvegarde de la liste des livres
  **/
  saveBooks(){
    firebase.database().ref('/books').set(this.books);
  }


  /**
  * Méthode de récupèration de liste des livres
  **/
  getBooks(){
    //la méthode on de firebase permet de mettre en un listener sur l'événement 'value'
    //dans le cas présent le callback sera ainsi appelé à chaque fois que le base sera modifiée
    firebase.database().ref('/books').on('value', (data: firebase.database.DataSnapshot) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
    });
  }

  /**
  * Méthode de récupèration d'un livre par son id
  **/
  getSingleBook(id: number){

    //la méthode once permet de ne faire qu'une requête (asynchrone) d'où l'utilisation de Promise
    return new Promise( (resolve, reject) =>{
      firebase.database().ref('/books/'+id).once('value').then(
         (data: firebase.database.DataSnapshot) => {
            resolve(data.val());
         }, (error) => {
            reject(error);
         }
      )
    });
  }


  /**
  * Méthode d'ajout d'un livre à la bibiliothéque
  **/
  createNewBook(newBook: Book){
    //Ajout du livre à la collection locale
    this.books.push(newBook);
    //Appel de la méthode permettant la sauvegarde
    this.saveBooks();
    this.emitBooks();
  }

  /**
  * Méthode de suppression d'un livre à la bibiliothéque
  **/
  removeBook(book: Book){
    const bookIndexToRemove = this.books.findIndex(
        (bookEl) => {
          if(bookEl === book) {
            return true;
          }
        }
      );
      this.books.splice(bookIndexToRemove, 1);
      this.saveBooks();
      this.emitBooks();
  }


}
