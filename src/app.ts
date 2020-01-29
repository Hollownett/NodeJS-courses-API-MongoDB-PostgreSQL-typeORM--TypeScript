import express, { Request, Response } from "express";
import * as bookController from "./controllers/bookController";
import "reflect-metadata";


// Our Express APP config
const app = express();
app.use(express.json());
app.set("port",  3000);



// API 
app.get("/", (req: Request, res: Response) => res.send("It works!"))
app.get("/books", bookController.allBooks);
app.get("/book/:id", bookController.getBook);
app.post("/book", bookController.addBook);
app.put("/book/:id", bookController.updateBook);
app.delete("/book/:id", bookController.deleteBook);
//Copy from MongoDB to PostgreSQL
app.get("/bookCopy", bookController.CopyAllBooks);

const server = app.listen(app.get("port"), () => {
  console.log("App is running on http://localhost:%d", app.get("port"));
});