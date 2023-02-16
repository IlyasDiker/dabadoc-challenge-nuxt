import { Favourite, Question } from "@prisma/client";
import { useAccountStore } from "~~/stores/account";

export default async function (questionId: String, ) {
    const accountStore = useAccountStore();
    if(!accountStore.isAuthenticated()){
        alert('Hmm, you should think about creating an account first!');
        return;
    }
    try{
        let res = await $fetch<Favourite|null>(`/api/questions/${questionId}/like`, {
            method: 'PUT',
            credentials: "include",
        })
        if(res){
            return res
        }
    } catch (e:any) {
        console.error('ERROR:' , e.toString());
        return null;
    }
}