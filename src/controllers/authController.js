const { registerUser, loginUser } = require('../services/authService');

const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        await registerUser(email, password, name);
        return res.status(201).json({ message: 'Usuario registrado correctamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el usuario.' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await loginUser(email, password);
        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
};

module.exports = {
    register,
    login
};