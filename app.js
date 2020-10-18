const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const conversionRouter = require("./routes/conversionRouter");
const cors = require("cors");

app.use(cors());
app.use(express.json());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute,
  max: 225, // 15 per minute
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      msg: "Too many requests, please wait a while before trying again!",
    });
  },
});

app.use(limiter);
app.use("/api/v1", conversionRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Server started on port " + PORT));
