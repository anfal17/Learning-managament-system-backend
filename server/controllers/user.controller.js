import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";

const cookieoptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
};

const register = async (req, res, next) => {
  // Added `next` parameter
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return next(new AppError("All fields required", 400));
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return next(new AppError("Email already exists", 400)); // Corrected error message
    }

    const user = await User.create({
      fullName,
      email,
      password,
      // avatar: {
      //   public_id: email, 
      //   secure_url: "placeholder_url",
      // },
    });

    if(!user){
      return next(new AppError('User registration failed, 400'))
    }

    await user.save();

    const token = await user.generateJWTToken(); // Moved token generation here

    res.cookie("token", token, cookieoptions);

    //ToDo file upload

    user.password = undefined; // Hide password from response

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token, // Include token in response
    });
  } catch (error) {
    console.log(error)

    return next(new AppError("User registration failed", 500)); // Catch and handle any errors
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("All fields are required", 400));
    }

    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user || !user.ComparePassword(password)) {
      return next(new AppError("Paswsword doesnt mactch", 400));
    }

    const token = await user.generateJWTToken();
    user.password = undefined;

    res.cookie("token", token, cookieoptions);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
    });
  } catch (e) {
    console.log(e)

    return next(new AppError(e.message, 500));
  }
};

const logout = (req, res) => {
  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User logged out suceessfully",
  });
};

const getProfile = async (req, res ,next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    res.status(200).json({
        succes:true,
        message:'User details',
        user 
    })
  } catch (e) {
    console.log(e)
    return next(new AppError('Failed to fetch profile  ', 400))
  }
};

export default {
  register,
  login,
  logout,
  getProfile,
};
