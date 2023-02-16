import { PrismaClient, Comment, Favourite } from "@prisma/client";
import { validateJWT } from "~~/server/service/validateJWT";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const token : any = await validateJWT(event);

    let questionId = event.context.params.id;

    try {
        let favourite : Favourite | null;

        favourite = await prisma.favourite.findFirst({
            where:{
                questionId: questionId,
                userId: token.id
            }
        })

        if(!favourite){
            favourite = await prisma.favourite.create({
                data:{
                    userId: token.id,
                    questionId: questionId,
                }
            });
            return favourite;
        } else {
            await prisma.favourite.deleteMany({
                where:{
                    userId: token.id,
                    questionId: questionId,
                }
            })
            return false;
        }

    } catch (error) {
        return error
    }
})