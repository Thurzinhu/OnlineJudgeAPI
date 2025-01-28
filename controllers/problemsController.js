const ProblemDAO = require('../persistence/dao/ProblemDAO');
const problemDAO = new ProblemDAO();

const getProblemById = async (req, res) => {
    try {
        const foundProblem = await problemDAO.getById(req.params.id);
        res.json(foundProblem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllProblems = async (req, res) => {
    const problems = await problemDAO.getAll();
    if (!problems)
    {
        return res.status(204).json({ message: 'No problems found.' });
    }
    res.json(problems);
};

const createProblem = async (req, res) => {
    try {
        const problemData = {
            ...req.body,
            author: req.userId,
            testCases: req.files.testCases
        }
        const newProblem = await problemDAO.create(problemData);
        res.status(201).json(newProblem);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
};

// TODO
// update this function so that it also updates the input and solution files
const updateProblem = async (req, res) => {
    try {
        const id = req.params.id;
        const foundProblem = await Problem.findById(id);
        if (!foundProblem)
        {
            return res.status(404).json({ message: `No problem matches ID ${id}.` });
        }
        if (foundProblem.author.toString() !== req.userId) {
            return res.status(403).json({ message: 'You are not authorized to update this problem.' });
        }
        const updates = req.body;
        const updatedProblem = await Problem.findByIdAndUpdate(id, updates, { new: true });
        res.json(updatedProblem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteProblem = async (req, res) => {
    try {
        await problemDAO.delete(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllProblems,
    getProblemById,
    createProblem,
    updateProblem,
    deleteProblem
};