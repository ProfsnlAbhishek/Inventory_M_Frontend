import api from "./axios";


export const getAllDisposal = async (): Promise<string[]> => {
   
    const {data} = await api.get<string[]>(`/disposal/`);
    return data;
}