const express = require("express");
const fs = require("fs");

const app = express();
const cors=require("cors");
app.use(cors());
app.use(express.json());
function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i;
  }
  return -1;
}

function removeAtIndex(arr, index) {
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) newArray.push(arr[i]);
  }
  return newArray;
}

app.get("/todos", (req, res) => {
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.get('/todos/:id', (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send();
    } else {
      res.json(todos[todoIndex]);
    }
  });
});


app.post("/todos", (req, res) => {
  let todo = req.body;
  let newTodo = {
    id: Math.floor(Math.random() * 1000000),
    title: todo.title,
    completed: todo.completed,
    description: todo.description,
  };
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    todos.push(newTodo);
    fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.status(201).json({ id: newTodo.id });
    });
  });
});

app.put("/todos/:id", (req, res) => {
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    const id = parseInt(req.params.id);
    const index = todos.findIndex((todo) => todo.id === id);
    if (index == -1) {
      res.status(404).send();
    } else {
      todos[index].description = req.body.description;
      todos[index].title = req.body.title;
      fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).send();
      });
    }
  });
});

app.delete("/todos/:id", (req, res) => {
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    const id = parseInt(req.params.id);
    const index = todos.findIndex((todo) => todo.id === id);
    if (index == -1) {
      res.status(404).send();
    } else {
      let newTodos = todos.filter((todo) => todo.id !== id);
      todos = newTodos;
      fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).send();
      });
    }
  });
});

app.use((req, res, next) => res.status(404).send());

module.exports = app;
app.listen(3000);