
import config from './../ormconfig';
import {createConnection} from "typeorm";
import {MyBook} from "./../entity/Book";
import { Request, Response } from "express";
import Book from "./../book";


export let allBooks = (req: Request, res: Response) => {
  let books = Book.find((err: any, books: any) => {
    if (err) {
      res.send("Error!");
    } else {
      res.send(books);
    }
  });
};

//Copy from MongoDB to PostgreSQL
export let CopyAllBooks = (req: Request, res: Response) => {
    let books = Book.find((err: any, books: any) => {
      if (err) {
        res.send("Error!");
      } else {
        createConnection(config).then(async connection => {
          await books.forEach(book => {
               let mybook : MyBook = new MyBook();
               mybook.title = book.title;
               mybook.author = book.author;
              connection.manager.save(mybook);
               console.log("Post has been saved: ", mybook);
           });
          }).catch(error => console.log("Error: ", error));
        res.send(books);
      }
    });
  };

export let getBook = (req: Request, res: Response) => {
    let book = Book.findById(req.params.id, (err: any, book: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(book);
        }
    });
};

export let deleteBook = (req: Request, res: Response) => {
    let book = Book.deleteOne({ _id: req.params.id }, (err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send("Succesfully Deleted Book");
        }
    });
};

export let updateBook = (req: Request, res: Response) => {
    console.log(req.body);
    let book = Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        (err: any, book: any) => {
            if (err) {
                res.send(err);
            } else {
                res.send("Succesfully updated book!");
            }
        }
    );
};

export let addBook = (req: Request, res: Response) => {
    var book = new Book(req.body);
    console.log(req.body);
    console.log(book);
    book.save((err: any) => {
        if (err) {
            console.log(err)
            res.send(err);
        } else {
            console.log(book);
            res.send(book);
        }
    });
};