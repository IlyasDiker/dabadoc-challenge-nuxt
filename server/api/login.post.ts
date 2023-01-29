import { PrismaClient, User } from "@prisma/client";
import bcrypt from 'bcrypt'; 
import { ISession } from "~~/types/ISession";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig()
  let email = body.email
  let password = body.password

  let user : User | null = await prisma.user.findUnique({
    where:{
      email: email,
    }
  })
  if(!user) return {
    error: "Wrong Credentials"
  }

  let match = await bcrypt.compare(password, user.password);
  if(match){
      delete user.password;
      let unp_token = {id: user.id, email: user.email, username: user.username}
      let session : ISession = {
        authToken: jwt.sign(unp_token, config.JWT_SECRET),
        user: user
      };
      return session;
  } else {
    return {
      error: "Wrong Credentials"
    }
  }
})  