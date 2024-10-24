import jwt from "jsonwebtoken";
import HttpResponse from "../utils/httpResponse.js";
const httpResponse = new HttpResponse();
import UserService from "../services/userServices.js";
const userServices = new UserService();
import "dotenv/config";
import logger from "../errors/Logger.js";

/**
 * Middleware que verifica el token de jwt es valido a través de las cookies
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return httpResponse.Unauthorized(res, "You need to log in.");
    const decode = jwt.verify(token, process.env.SECRET_KEY, { algorithms: ['HS256'] });
    const user = await userServices.getById(decode.userId);
    if (!user) return httpResponse.NotFound(res, "User not found");
    const now = Math.floor(Date.now() / 1000);
    const tokenExp = decode.exp;
    const timeUntilExp = tokenExp - now;
    if (timeUntilExp <= 900) {
      const newToken = userServices.generateToken(user, "15m");
      logger.info(">>>>>>SE REFRESCÓ EL TOKEN");
      res.cookie("token", newToken, { httpOnly: true, secure: true });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
