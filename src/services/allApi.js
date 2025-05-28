import commonApi from './commonApi'

export const registerUser=async(req)=>{
    return await commonApi('post','/register',req)
}
export const logibnUser=async(req)=>{
    return await commonApi('post','/login',req)
}
export const addNewVehicle=async(req,requestHeader)=>{
    return await commonApi('post','/addVehicle',req,requestHeader)
}
export const getVehiclesList=async(token)=>{
    return await commonApi('get','/getAllvehicle',{},token)
}
export const deleteVehicleByOwner=async(id,requestHeader)=>{
    return await commonApi('delete',`/deleteVehicle/${id}`,{},requestHeader)
}
export const getAllAvailableVehicle=async(req,requestHeader)=>{
   
     
    return await commonApi('get',`/getAvailableVehicle?search=${req}`,{},requestHeader)
}
export const addBooking=async(req,requestHeader)=>{
    return await commonApi('post','/addBooking',req,requestHeader)
}