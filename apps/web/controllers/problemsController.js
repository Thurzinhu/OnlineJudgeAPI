const ProblemDAO = require("../../lib/persistence/dao/ProblemDAO");
const problemDAO = new ProblemDAO();
const Paginator = require("../utils/Paginator");

const getProblemById = async (req, res) => {
  try {
    const foundProblem = await problemDAO.getById(req.params.id);
    res.json(foundProblem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProblemBySlug = async (req, res) => {
  try {
    const foundProblem = await problemDAO.getBySlug(req.params.slug);
    res.json(foundProblem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getAllProblems = async (req, res) => {
  try {
    const allProblems = await problemDAO.getAll();
    if (!allProblems || allProblems.length === 0) {
      return res.status(204).json({ message: "No problems found." });
    }
    const problemsPerPage = 30;
    const paginator = new Paginator(allProblems, problemsPerPage);
    const page = Number(req.query.page) || 1;
    let paginatedProblems;
    try {
      paginatedProblems = paginator.page(page);
    } catch (err) {
      if (err instanceof Paginator.PageNotIntegerError) {
        paginatedProblems = paginator.page(1);
      } else if (err instanceof Paginator.EmptyPageError) {
        paginatedProblems = paginator.page(paginator.totalPages);
      } else {
        throw err;
      }
    }
    return res.json(paginatedProblems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProblem = async (req, res) => {
  try {
    const problemData = {
      ...req.body,
      author: req.userId,
    };
    const newProblem = await problemDAO.create(problemData);
    res.status(201).json(newProblem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TODO
// update this function so that it also updates the input and solution files
const updateProblem = async (req, res) => {
  try {
    const id = req.params.id;
    const foundProblem = await Problem.findById(id);
    if (!foundProblem) {
      return res.status(404).json({ message: `No problem matches ID ${id}.` });
    }
    if (foundProblem.author.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this problem." });
    }
    const updates = req.body;
    const updatedProblem = await Problem.findByIdAndUpdate(id, updates, {
      new: true,
    });
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
  deleteProblem,
  getProblemBySlug
};
