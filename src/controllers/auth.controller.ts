import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  /**
   * SIGNUP
   */
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, token } = await this.authService.signup(req.body);
      return res
        .status(201)
        .json({
          message: `User registered successfully`,
          data: { user, token },
        });
    } catch (error) {
      next(error);
    }
  }

  /**
   * LOGIN
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, token } = await this.authService.login(req.body);
      return res
        .status(200)
        .json({
          message: `User logged in successfully`,
          data: { user, token },
        });
    } catch (error) {
      next(error);
    }
  }
}
