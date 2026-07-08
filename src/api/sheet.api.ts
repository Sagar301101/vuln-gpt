import axios from "axios";

export interface IStoreSubscribeData{
    name:string,
    email:string
}
export const storeSubscribeData=async(data:IStoreSubscribeData)=>{
    try {
        const url = import.meta.env.VITE_SHEET_API; 
    
        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        console.log('Data sent successfully:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error sending data to Google Sheets API:', error);
        throw error;
      }
}