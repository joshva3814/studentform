const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://joshvapobo:Joshva3814@demodb.lhesg.mongodb.net/sudentform', {})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use('/api', studentRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
