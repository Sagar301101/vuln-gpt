import axiosInstance from "../config/axios.config";
import { IStoreUserData } from "../interface/user";

export const storeUserData=(data:IStoreUserData)=>{
    return axiosInstance.post('/user/userDetials', data);
}