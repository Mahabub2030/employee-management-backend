// import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

// export const generateToken = (
//   payload: JwtPayload,
//   secret: string,
//   expiresIn: string,
// ) => {
//   const token = jwt.sign(payload, secret, {
//     expiresIn,
//   } as SignOptions);
//   return token;
// };

// export const verifyToken = (
//   token: string,
//   secret: string,
// ): JwtPayload | string => {
//   const verifiedToken = jwt.verify(token, secret);

//   return verifiedToken;
// };
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const generateToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: string,
): string => {
  // 1. Guard against empty or missing secrets
  if (!secret) {
    throw new Error("JWT Secret is missing or undefined in generateToken!");
  }

  // 2. Cast expiresIn safely within options
  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  };

  const token = jwt.sign(payload, secret, options);
  return token;
};

export const verifyToken = (
  token: string,
  secret: string,
): JwtPayload | string => {
  // 1. Guard against missing secret or invalid token string
  if (!secret) {
    throw new Error("JWT Secret is missing or undefined in verifyToken!");
  }

  if (!token) {
    throw new Error("No token provided to verifyToken!");
  }

  const verifiedToken = jwt.verify(token, secret);
  return verifiedToken;
};
