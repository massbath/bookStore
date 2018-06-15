import { Component, OnInit } from '@angular/core';
import {Book} from '../../models/book.model';
import {ActivatedRoute, Router} from '@angular/router';
import {BooksService} from '../../services/books.service';


/**
*Composant affichant le détail d'un livre
**/
@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  book: Book;

  constructor(private route: ActivatedRoute, private booksService : BooksService,
              private router: Router) { }


  /**
  * A l'initialisation du composant on récupère l'id du livre contenu dans le path, et on demande au services
  * de retourner le livre correspondant de sa collection
  **/
  ngOnInit() {
    this.book = new Book('','');
    const id = this.route.snapshot.params['id'];
    this.booksService.getSingleBook(+id).then(
       (book: Book) =>{
         this.book = book;
       }
    )
  }

  onBack(){
    this.router.navigate(['/books']);
  }

}
