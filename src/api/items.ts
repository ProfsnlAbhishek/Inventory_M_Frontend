import type { AddItem, Item } from "../types/Item";
import api from "./axios";

export const getAllItem = async (): Promise <Item[]> => {
    const {data} = await api.get<Item[]>(`/item/`);
    return data;
}


export const createItem = async (payload: AddItem): Promise<AddItem> =>{
    const {data} = await api.post<AddItem>(`/item`, payload);
    return data;
}

export const updateItem = async (id:number, payload: AddItem): Promise<Item>=>{
    const {data} = await api.put<Item>(`/item/${id}`, payload);
    return data;
}