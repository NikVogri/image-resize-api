const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const conversionRouter = require("./routes/conversionRouter");

app.use(express.json());
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // one minute,
  max: 15, // 15 per minute
});

app.use(limiter);
app.use("/api/v1", conversionRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Server started on port " + PORT));
