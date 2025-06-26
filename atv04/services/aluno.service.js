const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '../database/db.json');

function lerDados() {
    const dadosJson = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(dadosJson);
}

function escreverDados(dados) {
    fs.writeFileSync(dbPath, JSON.stringify(dados, null, 2));
}

class AlunoService {
    getAll() {
        return lerDados();
    }

    getById(id) {
        const alunos = lerDados();
        return alunos.find(aluno => aluno.id === id);
    }

    create(alunoData) {
        const alunos = lerDados();
        const ultimoId = alunos.length > 0 ? Math.max(...alunos.map(a => a.id)) : 0;
        const novoAluno = { id: ultimoId + 1, ...alunoData };
        
        alunos.push(novoAluno);
        escreverDados(alunos);
        
        return novoAluno;
    }

    update(id, alunoData) {
        const alunos = lerDados();
        const index = alunos.findIndex(aluno => aluno.id === id);
        if (index === -1) return null;

        const alunoAtualizado = { ...alunos[index], ...alunoData };
        alunos[index] = alunoAtualizado;
        escreverDados(alunos);
        
        return alunoAtualizado;
    }

    delete(id) {
        const alunos = lerDados();
        const index = alunos.findIndex(aluno => aluno.id === id);
        if (index === -1) return false;

        alunos.splice(index, 1);
        escreverDados(alunos);
        
        return true;
    }
}

module.exports = new AlunoService();
