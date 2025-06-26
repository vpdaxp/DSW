const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const alunoRoutes = require('./routes/aluno.routes');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API de Alunos está funcionando!');
});

app.use('/alunos', alunoRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
