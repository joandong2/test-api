require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// Routes
const postsRoutes = require("./routes/api/posts");

const app = express();
app.use(express.json()); //body

// Connect to mongoDB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/posts", postsRoutes); // posts

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server run at port ${PORT}`));
