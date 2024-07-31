const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const imageRoutes = require('./routes/imageRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/images', imageRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  w:1
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
