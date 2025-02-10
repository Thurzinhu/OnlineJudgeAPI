const yaml = require("js-yaml");

class ProblemDefinitionParser {
  problemTitle;
  functionName;
  inputFields;
  outputFields;

  parse(problemStructure) {
    const structure = yaml.load(problemStructure);
    const requiredFields = [
      "problem_title",
      "function_name",
      "input_fields",
      "output_field",
    ];
    requiredFields.forEach((field) => {
      if (!(field in structure)) {
        throw Error(`field ${field} not provided in Structure.yaml file`);
      }
    });
    this.problemTitle = structure.problem_title;
    this.functionName = structure.function_name;
    this.inputFields = structure.input_fields;
    this.outputFields = structure.output_field;
  }
}

module.exports = ProblemDefinitionParser;
