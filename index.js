const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
var todos=[];  
function findIndex(arr,id){
  for(let i=0;i<arr.length;i++){
    if(arr[i].id===id)return i;
   
  }
  return -1;
}
function removeAtIndex(arr,id){
  let newarray=[];
  for(let i=0;i<arr.length;i++){
    if(arr[i].id===id){
      continue;
    }
    newarray.push(arr[i]);
  }
  return newarray;
}
app.get('/',(req,res)=>{
  //console.log(todos);
  res.json(todos);
});
app.post('/todos',(req,res)=>{
  const todo={
    id :Math.floor(Math.random()*1000000),
    title:req.body.title,
    description:req.body.description

  };
  todos.push(todo);
  console.log(todos);
  res.status(201).json(todo);
});  
app.get('/todos/:id',(req,res)=>{
  const index=findIndex(todos,parseInt(req.params.id));
  if(index===-1){
    res.status(404).send();
  }
  else{
    res.json(todos[index]);
  }
});
app.delete('/todos/:id',(req,res)=>{
  const index= findIndex(todos,parseInt(req.params.id));
  if(index===-1){
      res.status(404).send();
  }
  else{
    todos=removeAtIndex(todos,index);
    res.status(201).send();
  }
});
app.put('/todos/:id',(req,res)=>{
  const index = findIndex(todos,parseInt(req.params.id));
  if(index===-1){
    res.status(401).send();
  }
  else {
    todos[index].title=req.body.title;
    todos[index].description=req.body.description;
    res.json(todos[index]);
  }
});
module.exports = app;
app.listen(8080);