const DefaultCodeDAO = require('../persistence/dao/DefaultCodeDAO');
const defaultCodeDAO = new DefaultCodeDAO();

const getDefaultCodeByProblem = async (req, res) => {
    try {
        const id = req.params.id;
        const defaultCode = await defaultCodeDAO.getByProblem(id);
        console.log(id, defaultCode);
        if (!defaultCode) {
            return res.status(404).json({ message: `No problem matches ID ${id}.` });
        }
        res.json(defaultCode);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getDefaultCodeByProblem };