import { CreateUserDto } from './dtos/CreateUser.dto';
import { IUser } from './models/User';
import UserModel from './models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import RefreshTokenModel from './models/RefreshToken';

dotenv.config();

class AuthService {
  private readonly jwtSecretKey = process.env.JWT_SECRET!;
  private readonly jwtRefreshKey = process.env.JWT_REFRESH_SECRET!;

  async registerUser(createUserDto: CreateUserDto): Promise<IUser> {
    const { email, password, username, city } = createUserDto;
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      email,
      username,
      password: encryptedPassword,
      city,
    });

    await user.save();
    return user;
  }
  
  async loginUser(email: string, password: string): Promise<{ user: IUser, accessToken: string, refreshToken: string } | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return null;

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    const refreshTokenDoc = new RefreshTokenModel({ token: refreshToken, user: user._id });
    await refreshTokenDoc.save();

    return { user, accessToken, refreshToken };
  }

  private generateAccessToken(user: IUser): string {
    return jwt.sign({ id: user._id, email: user.email }, this.jwtSecretKey, { expiresIn: '1h' });
  }

  private generateRefreshToken(user: IUser): string {
    return jwt.sign({ id: user._id, email: user.email }, this.jwtRefreshKey, { expiresIn: '7d' });
  }

  verifyJwt(token: string): any {
    try {
      return jwt.verify(token, this.jwtSecretKey);
    } catch (err) {
      return null;
    }
  }

  verifyRefreshToken(token: string): any {
    try {
      return jwt.verify(token, this.jwtRefreshKey);
    } catch (err) {
      return null;
    }
  }

  async refreshTokens(oldToken: string): Promise<{ accessToken: string, refreshToken: string } | null> {
    const tokenPayload = this.verifyRefreshToken(oldToken);
    if (!tokenPayload) return null;

    const user = await UserModel.findById(tokenPayload.id);
    if (!user) return null;

    const newAccessToken = this.generateAccessToken(user);
    const newRefreshToken = this.generateRefreshToken(user);

    const refreshTokenDoc = new RefreshTokenModel({ token: newRefreshToken, user: user._id });
    await refreshTokenDoc.save();

    await RefreshTokenModel.deleteOne({ token: oldToken });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}

export default AuthService;
