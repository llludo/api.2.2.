const mongoose = require('mongoose');

mongoose.connect(
    "mongodb+srv://"+process.env.DB_USER_PASS+"@cluster0.j4a3r.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      
      
     
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));
