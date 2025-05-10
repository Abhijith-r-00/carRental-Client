import commonApi from './commonApi'

export const registerUser=async(req)=>{
    return await commonApi('post','/register',req)
}
export const logibnUser=async(req)=>{
    return await commonApi('post','/login',req)
}