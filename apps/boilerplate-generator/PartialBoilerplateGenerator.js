const ProblemDefinitionParser = require('./ProblemDefinitionParser');

class PartialBoilerplateGenerator extends ProblemDefinitionParser {
    generateJsCode(problemStructure) {
        super.parse(problemStructure);
        const inputs = this.inputFields.map(field => field.name).join(', ');
        return `function ${this.functionName}(${inputs}) {\n\t//implemente aqui\n}`;
    }
}

module.exports = PartialBoilerplateGenerator;