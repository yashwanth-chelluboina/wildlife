const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.static("public"));

// File upload setup
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Sighting Submission Endpoint
app.post("/submit-sighting", upload.array("media"), (req, res) => {
  const { species, location, datetime, description, latitude, longitude } =
    req.body;
  const files = req.files.map((file) => file.path);

  console.log({
    species,
    location,
    datetime,
    description,
    latitude,
    longitude,
    files,
  });

  res.json({
    message: "Sighting submitted successfully!",
    data: {
      species,
      location,
      datetime,
      description,
      latitude,
      longitude,
      files,
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
