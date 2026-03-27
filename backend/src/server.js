require('dotenv').config();

const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = Number(process.env.PORT || 3000);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();
