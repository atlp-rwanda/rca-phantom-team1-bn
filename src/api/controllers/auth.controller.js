import * as _ from "lodash";
import { StatusCodes } from "http-status-codes";
import { verifyPassword } from "../utils/hash-password";
import { removeToken, signJwtToken, verifyToken } from "../utils/jwt";
import { getUser } from "../services/auth.service";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await getUser(email);

  const isPassValid = await verifyPassword(password, user.password);

  if (!isPassValid)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, message: "Invalid credentials" });

  const data = _.pick(user, ["id", "roleId"]);

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "User Logged in successfully",
    data,
    accessToken: signJwtToken(data),
  });
};

export const logout = async (req,res) =>{
  const token = req.headers.authorization
  // if (!token){
  //   return res
  //   .status(StatusCodes.BAD_REQUEST)
  //   .json({success: false, message: "Missing authorization token"})

  // }
  // if(!verifyToken(token)){
  //   return res
  //   .status(StatusCodes.UNAUTHORIZED)
  //   .json({success: false, message: "Invalid Token"})
  // }
  if(!removeToken(token)){
    return res
    .status(StatusCodes.BAD_REQUEST)
    .json({success: false, message: "Error logging out"})
  }

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "User Logged out successfully"
  });

  
}
