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
app.get('/tasks',(req,res)=>{
  //console.log(todos);
  return res.status(200).json({
    "todos":todos
  });
});
app.post('/tasks',(req,res)=>{
  const todo={
    id :Math.floor(Math.random()*1000000),
    title:req.body.title,
    description:req.body.description

  };
  try{
  todos.push(todo);
  console.log(todos);
  res.status(201).json(todo);
  }
  catch(error){
    return res.status(500).json({
        "msg":"something went wrong",
        "error":error
    })
  }
});  
app.get('/tasks/:id',(req,res)=>{
  const index=findIndex(todos,parseInt(req.params.id));
  try{
  if(index===-1){
    res.status(404).send();
  }
  else{
    return res.status(200).json({
        "todos" :todos[index]
  });

  }
}
catch(error){
    return res.status(400).json({
        "msg": "something went wrong",
        "error": error
    })
}
});
app.delete('/tasks/:id',(req,res)=>{
  const index= findIndex(todos,parseInt(req.params.id));
  try{
  if(index===-1){
    return  res.status(404).json({
        "msg":"id not found"
      });
  }
  else{
    todos=removeAtIndex(todos,index);
   return  res.status(201).json({
        "msg":"deleted successfully",
    });
  }
} catch(error){
    return res.status(500).json({
        "msg":"something went wrong",
        "error":error
    })
}
});
app.put('/tasks/:id',(req,res)=>{
  const index = findIndex(todos,parseInt(req.params.id));
  try{
  if(index===-1){
    res.status(401).send();
  }
  else {
    todos[index].title=req.body.title;
    todos[index].description=req.body.description;
    res.json(todos[index]);
  }
}
catch(error){
    return res.status(500).json({
        "error":"something went wrong",
        "error":error
    })
}
});
module.exports = app;
app.listen(8080);