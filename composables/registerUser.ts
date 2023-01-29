import { useAccountStore } from "~~/stores/account";
import { ISession } from "~~/types/ISession"

export default async function (username:String|null, email:String, password:String) {
    try{
        let res = await $fetch<ISession>('/api/register', {
            method: 'POST',
            body: {
                email: email,
                password: password,
                username: username,
            }
        })
        if(res){
            let accountStore = useAccountStore();
            accountStore.setSession(res);
            return res
        }
    } catch (e:any) {
        console.error('ERROR:' , e.toString());
        return null;
    }
}