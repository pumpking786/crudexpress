const express = require("express");
const bodyParser=require("body-parser")
const app = express();
const port = 8000;

app.use(bodyParser.json());

let items=[
    {id:1,name:'Pramit',description:'PumpKing'},
    {id:2,name:'Cyrus',description:'Suresh'}
]

app.get("/items",(req,res)=>{
    res.json(items);
})

app.post("/items",(req,res)=>{
    const{name,description}=req.body;
    const newItem={
        id:items.length+1,
        name,
        description
    }
    items.push(newItem);
    res.json(newItem);
})

app.put('/items/:id',(req,res)=>{
    const id=Number(req.params.id);
    const {name,description}=req.body;
    const item=items.find((i)=>i.id===id);
    if(!item){
        return res.json("Item not found");
    }else{
        item.name=name||item.name
        item.description=description||item.description
        return res.json(item)
    }
})

app.delete("/items/:id",(req,res)=>{
    const id=Number(req.params.id);
    const item=items.find((i)=>i.id===id);
    if(!item){
        return res.json("Item not found")
    }else{
        items.splice(item,1);
        res.json(id+ " Deleted");
    }
})

app.listen(port, () => {
    console.log("Server started ");
});
