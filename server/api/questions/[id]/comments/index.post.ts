import { PrismaClient, Comment } from "@prisma/client";
import { validateJWT } from "~~/server/service/validateJWT";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const token : any = await validateJWT(event);
    const body = await readBody(event);
    
    let message = body.message
    let questionId = event.context.params.id

    try {
        let comment: Comment = await prisma.comment.create({
            data:{
                message: message,
                userId: token.id,
                questionId: questionId,
            }
        });

        return comment;
    } catch (error) {
        return error
    }
})