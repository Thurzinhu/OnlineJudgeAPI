const fs = require("fs");
const path = require("path");
const PartialBoilerplateGenerator = require("./PartialBoilerplateGenerator");
const FullBoilerplateGenerator = require("./FullBoilerplateGenerator");

const MOUNT_PATH = path.join(__dirname, "../problems");

function generatePartialBoilerplate(problemSlug) {
  const problemStructurePath = path.join(
    MOUNT_PATH,
    problemSlug,
    "Structure.yaml",
  );
  const boilerplatePath = path.join(MOUNT_PATH, problemSlug, "boilerplate");
  try {
    const problemStructure = fs.readFileSync(problemStructurePath, "utf-8");
    const partialBoilerplateGenerator = new PartialBoilerplateGenerator();
    const jsCode = partialBoilerplateGenerator.generateJsCode(problemStructure);
    if (!fs.existsSync(boilerplatePath)) {
      fs.mkdirSync(boilerplatePath, { recursive: true });
    }
    fs.writeFileSync(path.join(boilerplatePath, "function.js"), jsCode);
  } catch (err) {
    console.log(err.message);
    return;
  }
  console.log("Partial boilerplate code generated!");
}

function generateFullBoilerplate(problemSlug) {
  const problemStructurePath = path.join(
    MOUNT_PATH,
    problemSlug,
    "Structure.yaml",
  );
  const fullBoilerplatePath = path.join(
    MOUNT_PATH,
    problemSlug,
    "boilerplate-full",
  );
  try {
    const problemStructure = fs.readFileSync(problemStructurePath, "utf-8");
    const fullBoilerplateGenerator = new FullBoilerplateGenerator();
    const jsCode = fullBoilerplateGenerator.generateJsCode(problemStructure);
    if (!fs.existsSync(fullBoilerplatePath)) {
      fs.mkdirSync(fullBoilerplatePath, { recursive: true });
    }
    fs.writeFileSync(path.join(fullBoilerplatePath, "function.js"), jsCode);
  } catch (err) {
    console.log(err.message);
    return;
  }
  console.log("Full boilerplate code generated!");
}

if (!process.env.PROBLEM_SLUG) {
  console.log("usage: PROBLEM_SLUG=slug npm run boilerplate");
  process.exit(1);
}

generatePartialBoilerplate(process.env.PROBLEM_SLUG);
generateFullBoilerplate(process.env.PROBLEM_SLUG);
