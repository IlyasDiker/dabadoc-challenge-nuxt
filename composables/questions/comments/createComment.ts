import { Comment } from "@prisma/client";
import { useAccountStore } from "~~/stores/account";

export default async function (questionId: String, message: String) {
    const accountStore = useAccountStore();
    if(!accountStore.isAuthenticated()){
        alert('Hmm, you should think about creating an account first!');
        return;
    }
    try{
        let res = await $fetch<Comment>(`/api/questions/${questionId}/comments`, {
            method: 'POST',
            credentials: "include",
            body: {
                message: message,
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