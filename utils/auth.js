import { hash, compare, hashSync,genSaltSync } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

const hashPassword = async (password) => {
  console.log(password)
  // password = ali1212 => Hash => dngsbipnrg9ipbn39ubnj9unertn
  const hashedPassword = await hash(password,12);
  
  return hashedPassword;
  
};

const generateToken = (data) => {
  console.log('object1')
  const token = sign({ ...data }, 'shhhhhhhhh', {
    // algorithm: ''
    expiresIn: 60*60*24*7,
  });
  
  return token;
};

const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};

const verifyToken =  (token) => {
  try {
    const validationResult = verify(token, 'shhhhhhhhh');
    return validationResult;
  } catch (err) {
    console.log("Verify Token Error =>", err);
    return false;
  }
};


export { hashPassword, generateToken, verifyPassword, verifyToken };
