import { H3Event } from "h3";
import jwt from "jsonwebtoken"

export function validateJWT(event:H3Event) {
    return new Promise((resolve, reject)=>{
        const config = useRuntimeConfig();
        let cookies = parseCookies(event)
        if(!cookies.account) reject({error: '401'})
        const cookie:any = JSON.parse(cookies.account);
        jwt.verify(cookie.authToken, config.JWT_SECRET, (err:any , token: any)=>{
            if(err){
                reject(err);
            } else {
                resolve(token);
            }
        })
    })
}