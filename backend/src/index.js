const express = require('express');
const cors = require('cors');
const enrollRoutes = require('./routes/enroll');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/enroll', enrollRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});