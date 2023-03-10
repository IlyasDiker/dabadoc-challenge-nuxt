import { Question, PrismaClient } from "@prisma/client";
import { validateJWT } from "~~/server/service/validateJWT";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const token : any = await validateJWT(event);
    const body = await readBody(event);
    
    let title = body.title
    let content = body.content
    let coordinate = body.coordinate

    try {
        let question: Question = await prisma.question.create({
            data:{
                title: title,
                content: content,
                coordinate: coordinate,
                userId: token.id,
            }
        });

        return question;
    } catch (error) {
        return error
    }
})