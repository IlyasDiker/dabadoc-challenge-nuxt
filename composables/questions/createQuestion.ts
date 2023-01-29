import { Question } from "@prisma/client";
import { useAccountStore } from "~~/stores/account";
import { ISession } from "~~/types/ISession"

export default async function (title:String, content:String, coordinate:String) {
    try{
        let res = await $fetch<Question>('/api/questions', {
            method: 'POST',
            credentials: "include",
            body: {
                title: title,
                content: content,
                coordinate: coordinate,
            }
        })
        if(res){
            return res
        }
    } catch (e:any) {
        console.error('ERROR:' , e.toString());
        return null;
    }
}