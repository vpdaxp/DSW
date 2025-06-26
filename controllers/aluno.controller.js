const alunoService = require('../services/aluno.service');

class AlunoController {
    async getAll(req, res) {
        const alunos = alunoService.getAll();
        res.json(alunos);
    }

    async getById(req, res) {
        const id = parseInt(req.params.id);
        const aluno = alunoService.getById(id);
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.json(aluno);
    }

    async create(req, res) {
        const novoAluno = alunoService.create(req.body);
        res.status(201).json(novoAluno);
    }

    async update(req, res) {
        const id = parseInt(req.params.id);
        const alunoAtualizado = alunoService.update(id, req.body);
        if (!alunoAtualizado) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.json(alunoAtualizado);
    }

    async delete(req, res) {
        const id = parseInt(req.params.id);
        const sucesso = alunoService.delete(id);
        if (!sucesso) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.status(204).send();
    }
}

module.exports = new AlunoController();