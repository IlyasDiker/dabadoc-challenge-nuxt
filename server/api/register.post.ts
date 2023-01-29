import { User , PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt' 
import { ISession } from "~~/types/ISession";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  
  let email = body.email
  let username =body.username
  let password = body.password

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  let user: User = await prisma.user.create({
    data:{
      email: email,
      username: username,
      password: hash
    }
  })
  delete user.password;

  let unp_token = {id: user.id, email: user.email, username: user.username}
  let session : ISession = {
    authToken: jwt.sign(unp_token, config.JWT_SECRET),
    user: user
  };
  return session;
})