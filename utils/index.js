import jwt from "jsonwebtoken";

const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  console.log('Generated Token:', token); // Log the token for debugging

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    domain: "stellar-task-manager.netlify.app",
    maxAge: 3600000, // 1 hour
  });

  console.log('Set-Cookie Header:', res.getHeaders()['set-cookie']); // Log Set-Cookie header for debugging
};
export default createJWT;
