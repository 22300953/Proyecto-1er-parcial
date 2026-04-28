require('ts-node/register');
require('dotenv').config();

const app = require('./src/app');

const PORT = Number(process.env.TEST_PORT || 4001);

app.listen(PORT, () => {
  // Log to make it easy to detect readiness from the terminal output
  console.log(`Test server listening on http://localhost:${PORT}`);
});
