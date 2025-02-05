const ProblemDefinitionParser = require('./ProblemDefinitionParser');

class FullBoilerplateGenerator extends ProblemDefinitionParser {
    generateJsCode(problemStructure) {
        super.parse(problemStructure);
        const inputs = this.inputFields.map(field => field.name).join(', ');
        const inputReads = this.inputFields.map(field => this.mapInputRead(field)).join('\n');
        const functionCall = `const result = ${this.functionName}(${inputs});`;
        const output = `console.log(result);`;
        return `##USER_CODE_HERE##\n\nconst input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\\n').join(' ').split(' ');\n${inputReads}\n${functionCall}\n${output}`;
    }

    mapInputRead(field) {
        switch (field.type) {
            case 'int':
                return `const ${field.name} = parseInt(input.shift());`;
            case 'float':
                return `const ${field.name} = parseFloat(input.shift());`;
            case 'string':
                return `const ${field.name} = input.shift();`;
            default:
                if (field.type.startsWith('list<')) {
                    const elementType = field.type.match(/list<(.+)>/)[1];
                    let mapFunction = elementType === 'string' ? '' : `.map(${elementType === 'float' ? 'parseFloat' : 'Number'})`;
                    return `const size_${field.name} = parseInt(input.shift());\nconst ${field.name} = input.splice(0, size_${field.name})${mapFunction};`;
                }
                throw new Error(`Unsupported type: ${field.type}`);
        }
    }
}

module.exports = FullBoilerplateGenerator;
