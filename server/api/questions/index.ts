import { Question, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        let questions: Question[] = await prisma.question.findMany();

        return questions;
    } catch (error) {
        console.log(error);
        return error
    }
})