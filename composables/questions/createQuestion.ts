import { Question } from "@prisma/client";
import { useAccountStore } from "~~/stores/account";

export default async function (title:String, content:String, coordinate:JSON|null) {
    const accountStore = useAccountStore();
    if(!accountStore.isAuthenticated()){
        alert('Hmm, you should think about creating an account first!');
        return;
    }
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