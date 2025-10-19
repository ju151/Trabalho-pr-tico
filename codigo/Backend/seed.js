// Conteúdo de: Backend/seed.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Vaccine from './src/models/Vaccine.js'; // Corrija o caminho se 'models' não estiver em 'src'
import { seedVaccines } from './Data/SeedVaccines.js';

dotenv.config();

const seedDB = async () => {
  try {
    // 1. Conectar ao DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado para seeding...');

    // 2. Limpar dados antigos
    await Vaccine.deleteMany({});
    console.log('Vacinas antigas removidas...');

    // 3. Inserir novos dados
    await Vaccine.insertMany(seedVaccines);
    console.log('Novas vacinas cadastradas!');

    // 4. Desconectar
    await mongoose.connection.close();
    console.log('Desconectado do MongoDB.');
    process.exit(0);
  } catch (err) {
    console.error('Erro no seeding:', err);
    process.exit(1);
  }
};

seedDB();