import Services from "./classServices.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { createHash, isValidPassword } from "../utils/utils.js";
import UserDaoMongoDB from "../daos/userDao.js";
const userDao = new UserDaoMongoDB();

export default class UserServices extends Services {
  constructor() {
    super(userDao);
  }

  generateToken(user, time = "15m") {
    const payLoad = {
      userId: user._id,
    };
    return jwt.sign(payLoad, process.env.SECRET_KEY, {
      expiresIn: time,
      algorithm: "HS256",
    });
  }

  async register(user) {
    try {
      const { email, password } = user;
      const userExists = await this.dao.getByEmail(email);
      if (userExists) return null;
      const newUser = await this.dao.create({
        ...user,
        password: createHash(password),
      });
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExists = await this.dao.getByEmail(email);
      if (!userExists) return null;
      const passwordValidated = isValidPassword(password, userExists.password);
      if (!passwordValidated) return null;
      return this.generateToken(userExists);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getByEmail(email) {
    try {
      const user = await this.dao.getByEmail(email);
      if (!user) return null;
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async generateResetPass(user) {
    try {
      return this.generateToken(user, "1h");
    } catch (error) {
      throw new Error(error);
    }
  }

  async updatePass(pass, user) {
    try {
      const response = isValidPassword(pass, user.password);
      if (response) return null;
      const newPass = createHash(pass);
      return await this.dao.update(user._id, { password: newPass });
    } catch (error) {
      throw new Error(error);
    }
  }
}
