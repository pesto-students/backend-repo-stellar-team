import jwt from "jsonwebtoken";

const createJWT = (res, userId) => {
  console.log("createJWT called")
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    domain: 'stellar-task-manager.netlify.app', // Use your domain here
    maxAge: 3600000, // 1 h
  });
};

export default createJWT;
