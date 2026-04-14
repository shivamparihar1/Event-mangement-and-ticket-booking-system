const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const header = req.header("Authorization");

    if (!header) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    // 🔥 REMOVE "Bearer "
    const token = header.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token format invalid" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;

    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message); // debug
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;