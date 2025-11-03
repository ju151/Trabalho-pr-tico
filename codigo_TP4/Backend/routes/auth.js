import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import User from "../src/models/User.js"; 

const router = express.Router();

// Rota de Cadastro 
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
    // O 'role' será "user" por defeito (definido no Modelo)
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

// Rota de Login 
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

    // 2. Criar o Payload (o conteúdo do "crachá")
    const payload = {
      user: {
        id: user._id,
        role: user.role
      }
    };

    // 3. Assinar e criar o Token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' }, // Expira em 5 horas
      (err, token) => {
        if (err) throw err;
        // 4. Enviar o Token e os dados do utilizador
        res.json({
          msg: "Login bem-sucedido!",
          token: token,
          userId: user._id,
          userEmail: user.email,
          userRole: user.role // Envia o 'role' para o frontend
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro no servidor." });
  }
});

export default router;