const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const express = require('express')
const app = express();

// dotenv.config({path: './cofig.env'})

mongoose
  .connect("mongodb://127.0.0.1:27017/UserData", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then((con) => {
    console.log("D connected succesfully");
  });
const port = process.env.PORT || 8080;

const dataSchema = new mongoose.Schema({
  first: {
    type: String,
    required: true,
  },
  last: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    // type: String,
    // required: true,
  },
});

const Data = mongoose.model("Data", dataSchema);

app
  .use(express.static(`public`))
  .use(morgan("dev"))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())

  .post("/user-response", async (req, res) => {
    try {
      //   res.status(200).json(req.body);
      Data.create(req.body);
      res.end(
        `Thank you for your response ${req.body.first} it is being processed `
      );
    } catch (error) {
      console.log("Error in the database", error);
    }
  })
  .listen(port, () => console.log(`Server listening at port ${port}`));
