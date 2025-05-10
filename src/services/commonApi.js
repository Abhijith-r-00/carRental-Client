import axios from "axios";
import BaseURL from "./baseUrl";


const commonApi=async(httpMethod,endpoint,data,requestHeader)=>{
    const configration={
        method:httpMethod,
        url:BaseURL+endpoint,
        data:data,
        headers:requestHeader?requestHeader:{"Content-Type":"application/json"}
    }
   return await axios(configration).then((res)=>{
        return res
    }).catch((err)=>{
        return err
    })
}

export default commonApi