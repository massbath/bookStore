import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Book} from '../../models/book.model';
import {BooksService} from '../../services/books.service';
import {Router} from '@angular/router';


/**
* Composant gérant l'ajout d'un livre à la collection
**/
@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm : FormGroup;

  constructor(private formBuilder: FormBuilder,private booksService: BooksService, private router : Router) { }

  ngOnInit() {
    this.initForm();
  }


  initForm(){
    this.bookForm = this.formBuilder.group({
      title : ['',Validators.required],
      author : ['',Validators.required],
      synopsis : ''
    });
  }

  onSubmit(){
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;
    const synopsis = this.bookForm.get('synopsis').value;

    const newBook = new Book(title,author);
    newBook.synopsis = synopsis;

    //Aprés l'ajout du livre on redirige l'utilisateur vers la liste de livres
    this.booksService.createNewBook(newBook);
    this.router.navigate(['/books']);

  }

}
