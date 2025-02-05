const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const ProblemDefinitionParser = require('../boilerplate-generator/ProblemDefinitionParser');
const connectDb = require('../../config/dbConnection');
const ProblemDAO = require('../../persistence/dao/ProblemDAO');
const DefaultCodeDAO = require('../../persistence/dao/DefaultCodeDAO');
const supportedLanguages = require('../../config/languages_list');
const problemDAO = new ProblemDAO();
const defaultCodeDAO = new DefaultCodeDAO();

const MOUNT_PATH = process.env.MOUNT_PATH ?? path.join(__dirname, '../problems');

async function upsertProblemToDb(problemSlug) {
    const problemPath = path.join(MOUNT_PATH, problemSlug);
    try {
        const description = fs.readFileSync(path.join(problemPath, 'Problem.md'), 'utf-8');
        const problemStructure = fs.readFileSync(path.join(problemPath, 'Structure.yaml'), 'utf-8');
        const parser = new ProblemDefinitionParser();
        parser.parse(problemStructure);
        const title = parser.problemTitle;
        if (await problemDAO.getByTitle(title)) {
            return;
        }
        const problemData = {
            description,
            title,
            slug: problemSlug
        }
        const newProblem = await problemDAO.create(problemData);
        await Promise.all(
            Object.keys(supportedLanguages).map(async (language) => {
                const boilerplate = fs.readFileSync(path.join(problemPath, 'boilerplate', `function.${language}`));
                await defaultCodeDAO.create({ boilerplate, problem: newProblem });
            })
        );        
    } catch (err) {
        console.log(err.message);
        return;
    }
}

if (!process.env.PROBLEM_SLUG) {
    console.log('usage: PROBLEM_SLUG=slug npm run db:problem');
}

connectDb();

mongoose.connection.once('open', async () => {
    console.log('Connected to db');
    await upsertProblemToDb(process.env.PROBLEM_SLUG);
    mongoose.connection.close();
    process.exit(0);
});
