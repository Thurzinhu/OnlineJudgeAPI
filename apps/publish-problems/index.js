const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const ProblemDefinitionParser = require("../boilerplate-generator/ProblemDefinitionParser");
const connectDb = require("../lib/config/dbConnection");
const ProblemDAO = require("../lib/persistence/dao/ProblemDAO");
const DefaultCodeDAO = require("../lib/persistence/dao/DefaultCodeDAO");
const supportedLanguages = require("../lib/config/languages_list");
const problemDAO = new ProblemDAO();
const defaultCodeDAO = new DefaultCodeDAO();

const MOUNT_PATH =
  process.env.MOUNT_PATH ?? path.join(__dirname, "../problems");

const getAllProblemSlugs = async (dirPath) => {
  try {
    const slugs = await fs.promises.readdir(dirPath);
    return slugs;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

async function publishProblemsToDb() {
  try {
    const problemSlugs = await getAllProblemSlugs(MOUNT_PATH);
    for (let problemSlug of problemSlugs) {
      const problemPath = path.join(MOUNT_PATH, problemSlug);
      const description = fs.readFileSync(
        path.join(problemPath, "Problem.md"),
        "utf-8",
      );
      const problemStructure = fs.readFileSync(
        path.join(problemPath, "Structure.yaml"),
        "utf-8",
      );
      const parser = new ProblemDefinitionParser();
      parser.parse(problemStructure);
      const title = parser.problemTitle;
      if (await problemDAO.getByTitle(title)) {
        continue;
      }
      const problemData = {
        description,
        title,
        slug: problemSlug,
      };
      const newProblem = await problemDAO.create(problemData);
      await Promise.all(
        Object.keys(supportedLanguages).map(async (language) => {
          const boilerplate = fs.readFileSync(
            path.join(problemPath, "boilerplate", `function.${language}`),
          );
          await defaultCodeDAO.create({ boilerplate, problem: newProblem });
        }),
      );
    }
  } catch (err) {
    console.log(err.message);
    return;
  }
}

connectDb();

mongoose.connection.once("open", async () => {
  console.log("Publish-problems connected to db");
  try {
    await publishProblemsToDb();
  } catch (err) {
    console.error("Error publishing problems:", err.message);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
});
