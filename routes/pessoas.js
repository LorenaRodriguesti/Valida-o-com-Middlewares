const express = require('express')

const router = express.Router()

let listaPessoas = [ 
    {
        nome: "Pedro",
        idade: 16,
        email: "pedrogtr234@gmail.com",
        telefone: "619877646"
    }
]

// middlewares de validação
// Validar se o pessoas existe
function validarPessoas(req, res, next) {
    const nome = req.params.nome
    const pessoas = listaPessoas.find(pessoas => pessoas.nome == nome)
    if (pessoas) {
        req.pessoas = pessoas
        next()
    } else {
        return res.status(404).json({ mensagem: "pessoas não encontrado!" })
    }
}

// validar os atributos do corpo
function validarAtributos(req, res, next) {
    const dadosRecebidos = req.body
    if (!dadosRecebidos.idade || !dadosRecebidos.email) {
        return res.status(400).json({ mensagem: "idade e preço são obrigatórios" })
    } else {
        next()
    }
}


// READ -> Buscar todos os pessoas
router.get('/pessoas', (req, res) => {
    res.status(200).json(listaPessoas)
})

// READ -> Busca de pessoas especifico
router.get('/pessoas/:id', validarPessoas, (req, res) => {
    res.json(req.pessoas)
})


// CREATE -> Cadastro de um pessoas
router.post('/pessoas', validarAtributos, (req, res) => {
    const dados = req.body

    const pessoas = {
        id: Math.round(Math.random() * 1000),
        idade: dados.idade,
        email: dados.email, 
        telefone: dados.telefone
    }

    listaPessoas.push(pessoas)

    res.status(201).json(
        {
            mensagem: "pessoas cadastrado com sucesso!",
            pessoas
        }
    )
})

// UPDATE -> Alterar um pessoas
router.put('/pessoas/:id', validarAtributos, validarPessoas, (req, res) => {
    const nome = req.params.id
    const novosDados = req.body

    const index = listaPessoas.findIndex(pessoas => pessoas.nome == nome)
    
    const pessoas = {
        nome: Number(nome),
        idade: novosDados.idade,
        email: novosDados.email,
        telefone:novosDados.telefone
    }

    listaPessoas[index] = pessoas

    res.status(200).json(
        {
            mensagem: "pessoas alterado com sucesso!",
            pessoas
        }
    )
})

// DELETE -> Excluir pessoas
router.delete('/pessoas/:id', validarPessoas, (req, res) => {
    const nome = req.params.id
    const index = listaPessoas.findIndex(pessoas => pessoas.nome == nome)
    listaPessoas.splice(index, 1)
    res.status(200).json({ mensagem: "pessoas excluida sucesso!" })
})




module.exports = router