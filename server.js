const express = require('express');
const app = express();
app.use(express.json());

let produtos = [];
let nextId = 1;

app.get("/produtos", (req, res)=>{
    res.status(200).send(produtos)
})

app.get("/produtos/:id", (req, res)=>{
    res.status(200).send(produtos[req.params.id])
})

app.post("/produtos", (req, res)=>{ 
    let produto = {id: nextId, nome: req.body.nome, preco : req.body.preco}
    produtos.push(produto)
    nextId += 1
    res.status(201).send("produto criado")
})

app.put("/produtos/:id", (req, res)=>{

    let produtoMudado = req.body
    let posProduto = produtos.findIndex(produto => produto.id === req.params.id)
    
    if (posProduto !== -1){
        produtos.splice(posProduto, 1, produtoMudado)
        res.status(200).send("Produto atualizado") 
    }
    else{
        res.status(404).send("erro")
    }
})
app.delete("/produtos/:id", (req, res)=>{
    let posProduto = produtos.findIndex(produto => produto.id === req.params.id)
    if (posProduto !== -1){
        produtos.splice(posProduto, 1)
        res.status(204)
    }
    else{
        res.status(404).send("erro")
    }
})
// TODO: Implemente o CRUD de produtos em memória:
// POST   /produtos           → 201 + { id, nome, preco }
// GET    /produtos           → 200 + array de produtos
// GET    /produtos/:id       → 200 + produto ou 404
// PUT    /produtos/:id       → 200 + produto atualizado ou 404
// DELETE /produtos/:id       → 204 ou 404

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
