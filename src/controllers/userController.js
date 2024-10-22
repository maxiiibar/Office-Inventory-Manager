import Controller from "./classController.js";
import UserServices from "../services/userServices.js";
const userService = new UserServices();
import HttpResponse from "../utils/httpResponse.js";
// import { sendMail } from "../services/emailServices.js";
const httpResponse = new HttpResponse();

export default class UserController extends Controller {
  constructor() {
    super(userService);
  }

  register = async (req, res, next) => {
    try {
      const user = await this.service.register(req.body);
      if(!user) return httpResponse.BadRequest(res, "User already exists.")
      const token = this.service.generateToken(user);
      res.cookie("token", token, { httpOnly: true, secure: true });
      return httpResponse.Ok(res, { user: user, token: token });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const token = await this.service.login(req.body);
      if (!token) httpResponse.Unauthorized(res, "Incorrect email or password.");
      res.cookie("token", token, { httpOnly: true, secure: true });
      const user = await this.service.getByEmail(req.body.email);
      const { firstName, lastName, email } = user;
      httpResponse.Ok(res, {
        user: {
          firstName,
          lastName,
          email,
        },
        token,
      });
    } catch (error) {
      next(error);
    }
  };

  // generateResetPass = async (req, res, next) => {
  //   try {
  //     const user = req.user;
  //     const token = await this.service.generateResetPass(user);
  //     if (token) {
  //       await sendMail(user, "resetPass", token);
  //       res.cookie("tokenpass", token);
  //       httpResponse.Ok(res, 'Email "reset pass" sent ok');
  //     } else httpResponse.BadRequest(res, 'Error sending email "reset pass"');
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // updatePass = async (req, res, next) => {
  //   try {
  //     const user = req.user;
  //     const { password } = req.body;
  //     const { tokenpass } = req.cookies;
  //     if (!tokenpass) return httpResponse.Unauthorized(res, token);
  //     const updPass = await this.service.updatePass(password, user);
  //     if (!updPass) httpResponse.BadRequest(res, "Can't be the same password");
  //     res.clearCookie("tokenpass");
  //     httpResponse.Ok(res, updPass);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  logOut = async (req, res, next) => {
    try {
      res.clearCookie("token");
      httpResponse.Ok(res, "Logged out successfully");
    } catch (error) {
      next(error);
    }
  };
}
