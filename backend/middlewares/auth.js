import { verifyToken } from "../connection/auth.js";

export function checkAuth(req, res, next) {
  try {
    const cookieToken = req.cookies.token ?? "";
    const headerToken = req.headers.authorization?.split(" ")[1] ?? "";
    const token = cookieToken || headerToken;
    if (!token) {
      return res.send({
        message: "Unauthorized access",
        error: true,
        status: "failed",
      });
    } else {
      const user = verifyToken(token);
      req.user = {
        id: user._id,
        role: user.role,
        email: user.email,
        username: user.username,
      };

      next();
    }
  } catch (err) {
    return res.status(401).json({
      message: "Authentication failed",
      error: true,
      status: "failed",
    });
  }
}
