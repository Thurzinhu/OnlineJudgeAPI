const Problem = require('../models/Problem');
const mongoose = require('mongoose');

const getProblemById = async (req, res) => {
    try {
        const id = req.params.id;
        const foundProblem = await Problem.findOne({ _id: id});
        if (!foundProblem)
        {
            return res.status(404).json({ message: `No problem matches ID ${id}.` });
        }
        res.json(foundProblem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllProblems = async (req, res) => {
    const problems = await Problem.find();
    if (!problems)
    {
        return res.status(204).json({ message: 'No problems found.' });
    }
    res.json(problems);
};

const createProblem = async (req, res) => {
    const { title, description, constraints, inputFiles, outputFiles } = req.body;
    if (!title || !description || !constraints)
    {
        return res.status(400).json({ message: 'Title, description and constraints are required' });
    }
    if (!inputFiles || !outputFiles)
    {
        return res.status(400).json({ message: 'input and outfiles are required' });
    }
    try {
        const newProblem = await Problem.create({
            title,
            description,
            constraints,
            inputFiles,
            outputFiles,
            author: req.userId
        });
        res.status(201).json(newProblem);
    } catch(err) {
        res.status(500).json({ error: err.message() });
    }
};

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
        const id = req.params.id;
        const foundProblem = await Problem.findById(id);
        if (!foundProblem)
        {
            return res.status(404).json({ message: `No problem matches ID ${id}.` });
        }
        await Problem.findByIdAndDelete(id);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllProblems,
    getProblemById,
    createProblem,
    updateProblem,
    deleteProblem
};