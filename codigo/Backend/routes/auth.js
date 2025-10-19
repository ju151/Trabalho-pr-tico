import express from "express";
import bcrypt from "bcryptjs";
import User from "../src/models/User.js"; 

const router = express.Router();

// Rota: POST /api/auth/register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Por favor, informe email e senha." });
  }

  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({ msg: "Este email já está cadastrado." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ msg: "Usuário cadastrado com sucesso!" });
  
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro no servidor." });
  }
});

// Rota: POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "Email ou senha inválidos." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Email ou senha inválidos." });
    }

    
    res.json({
      msg: "Login bem-sucedido!",
      token: "jwt-token-falso-para-exemplo",
      userId: user._id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro no servidor." });
  }
});

export default router;