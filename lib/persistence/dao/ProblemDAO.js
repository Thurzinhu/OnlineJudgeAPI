const IProblemDAO = require("./interfaces/IProblemDAO");
const Problem = require("../models/Problem");

class ProblemDAO extends IProblemDAO {
  constructor() {
    super();
  }

  async create(problem) {
    const newProblem = await Problem.create(problem);
    return newProblem;
  }

  async update(id, fields) {}

  async delete(id) {
    const foundProblem = await Problem.findByIdAndDelete(id);
    return foundProblem;
  }

  async getById(id) {
    const foundProblem = await Problem.findOne({ _id: id });
    return foundProblem;
  }

  async getByTitle(title) {
    const foundProblem = await Problem.findOne({ title: title });
    return foundProblem;
  }

  async getBySlug(slug) {
    const foundProblem = await Problem.findOne({ slug: slug });
    return foundProblem;
  }

  async getAll() {
    const problems = await Problem.find();
    return problems;
  }
}

module.exports = ProblemDAO;
