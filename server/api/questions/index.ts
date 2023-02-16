import { Question, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const params = getQuery(event);
    let location: any;
    if(params.lat && params.lng){
        location = {
            lng: params.lng,
            lat: params.lat
        }
    }
    try {
        let questions: Question[] = await prisma.question.findMany({
            include:{
                favoritedBy: true,
                comments: {
                    include:{
                        user:true
                    }
                }
            },
            orderBy:{
                createdAt: 'desc'
            }
        });

        if(location){
            function distance(coord1:any, coord2:any) {
                if(coord1 == null || coord2==null ||
                    coord1.lat == null || coord1.lng == null 
                    || coord2.lat == null || coord2.lng == null ) return 9999;
                const lngDiff = (coord1?.lng||0) - (coord2?.lng||0);
                const latDiff = (coord1?.lat||0) - (coord2?.lat||0);
                return Math.sqrt(lngDiff * lngDiff + latDiff * latDiff);
            }
              
            questions.sort((q1, q2) => {
                const dist1 = distance(q1.coordinate, location);
                const dist2 = distance(q2.coordinate, location);
                return dist1 - dist2;
            });
        }

        return questions;
    } catch (error) {
        console.log(error);
        return error
    }
})