validateForm = (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        res.status(400).json({ message: 'Please enter all fields' });
    } else {
        res.status(200).json({ message: 'Form validated' });
    }
}
module.exports = validateForm;