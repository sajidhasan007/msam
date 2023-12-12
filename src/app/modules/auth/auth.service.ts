/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Admin } from '../admin/admin.model';
import { Student } from '../student/student.model';
import { User } from '../user/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { ForgetPassword } from './auth.model';
import { sendEmail } from './sendResetMail';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;
  // creating instance of User
  // const user = new User();
  //  // access to our instance methods
  //   const isUserExist = await user.isUserExist(id);

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token

  const { _id: userId, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token

  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.email,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  // // checking is user exist
  // const isUserExist = await User.isUserExist(user?.userId);

  //alternative way
  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password'
  );

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // checking old password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
  }

  // // hash password before saving
  // const newHashedPassword = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bycrypt_salt_rounds)
  // );

  // const query = { id: user?.userId };
  // const updatedData = {
  //   password: newHashedPassword,  //
  //   needsPasswordChange: false,
  //   passwordChangedAt: new Date(), //
  // };

  // await User.findOneAndUpdate(query, updatedData);
  // data update
  isUserExist.password = newPassword;

  // updating using save()
  isUserExist.save();
};

const forgotPass = async (payload: { email: string }) => {
  const user = await User.findOne(
    { email: payload.email },
    { email: 1, role: 1 }
  );

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist!');
  }

  let profile: any = null;
  if (user.role === ENUM_USER_ROLE.ADMIN) {
    profile = await Admin.findOne({ email: user.email });
  } else if (user.role === ENUM_USER_ROLE.STUDENT) {
    profile = await Student.findOne({ email: user.email });
  }
  // else if (user.role === ENUM_USER_ROLE.FACULTY) {
  //   profile = await Faculty.findOne({ email: user.email });
  // }

  if (!profile) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Pofile not found!');
  }

  if (!profile.email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email not found!');
  }

  // const passResetToken = await jwtHelpers.createResetToken(
  //   { id: user.id },
  //   config.jwt.secret as string,
  //   '50m'
  // );

  // const resetLink: string = config.resetlink + `token=${passResetToken}`;
  function generateRandom4DigitNumber() {
    return Math.floor(1000 + Math.random() * 9000); // Generates a number between 1000 and 9999
  }

  const random4DigitNumber = generateRandom4DigitNumber();

  const otpHistory = await ForgetPassword.findOne(
    { email: payload.email },
    { email: 1, otp: 1 }
  );
  if (otpHistory) {
    await ForgetPassword.findOneAndUpdate(
      { email: payload.email },
      { otp: random4DigitNumber, otpSetTime: new Date(), isOtpMatch: false },

      {
        new: true,
      }
    );
  } else {
    await ForgetPassword.create({
      email: payload.email,
      otp: random4DigitNumber,
      otpSetTime: new Date(),
      isOtpMatch: false,
    });
  }
  await sendEmail(
    profile.email,
    `
      <div>
        <p>Hi, ${profile.fullName}</p>
        <p>Your OTP is ${random4DigitNumber}</p>
        <p>Thank you</p>
      </div>
  `
  );

  // return {
  //   message: "Check your email!"
  // }
};

const matchOtp = async (payload: { email: string; otp: string }) => {
  const { email, otp } = payload;
  const user = await User.findOne({ email }, { email: 1 });

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!');
  }

  const savedOtp = await ForgetPassword.findOne({ email });
  let timeDifferenceInMinutes = 0;

  if (!savedOtp) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid email!');
  } else {
    // Current date
    const currentDate: Date = new Date();

    // Calculate the time difference in milliseconds
    const timeDifferenceInMilliseconds: number =
      currentDate.getTime() - savedOtp.otpSetTime.getTime();

    // Convert milliseconds to minutes
    timeDifferenceInMinutes = Math.floor(
      timeDifferenceInMilliseconds / (1000 * 60)
    );
  }

  if (timeDifferenceInMinutes > 5) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'OTP time limit exceeded!');
  }

  if (savedOtp.otp !== otp) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid otp!');
  }

  await ForgetPassword.findOneAndUpdate(
    { email },
    { isOtpMatch: true },

    {
      new: true,
    }
  );

  // console.log('my otp history is = ', savedOtp);

  // const isVarified = await jwtHelpers.verifyToken(
  //   token,
  //   config.jwt.secret as string
  // );

  // const password = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bycrypt_salt_rounds)
  // );

  // await User.updateOne({ id }, { password });
};

const resetPassword = async (payload: {
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const { email, password, confirmPassword } = payload;
  if (password !== confirmPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password does not match!');
  }

  const otpHistory = await ForgetPassword.findOne({ email: payload.email });

  if (!otpHistory || !otpHistory.isOtpMatch) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Please match otp first!');
  }

  const user = await User.findOne({ email }, { email: 1 });

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!');
  }
  console.log('my email and pass is = ', email, ' - ', password);
  const hasPassword = await bcrypt.hash(
    password,
    Number(config.bycrypt_salt_rounds)
  );
  const result = await User.findOneAndUpdate(
    { email },
    { password: hasPassword },

    {
      new: true,
    }
  );
  console.log('my update result = ', result);
  // const isVarified = await jwtHelpers.verifyToken(
  //   token,
  //   config.jwt.secret as string
  // );

  // const password = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bycrypt_salt_rounds)
  // );

  // await User.updateOne({ id }, { password });
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPass,
  resetPassword,
  matchOtp,
};
