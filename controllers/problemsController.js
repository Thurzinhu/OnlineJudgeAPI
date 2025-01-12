const Problem = require('../models/Problem');
const mongoose = require('mongoose');
const { getFileContent } = require('../utils/fileManager');

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
    const { title, description, constraints } = req.body;
    if (!title || !description || !constraints)
    {
        return res.status(400).json({ message: 'Title, description and constraints are required' });
    }
    const inputFiles = req.files?.inputFiles?.map(file => getFileContent(file));
    const solutionCode = req.files?.solutionFile?.map(file => getFileContent(file))[0];
    if (!inputFiles)
    {
        return res.status(400).json({ message: 'input files are required' });
    }
    if (!solutionCode)
    {
        return res.status(400).json({ message: 'Solution code is required' });
    }
    try {
        const newProblem = await Problem.create({
            title,
            description,
            constraints,
            inputFiles,
            author: req.userId,
            solutionCode
        });
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