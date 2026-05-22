import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateItem } from "../../../api/items";
import type {AddItem, AddItemInput} from "../../../types/Item";

export function useUpdateItem(id:number){
    const qc = useQueryClient();
    return useMutation<AddItem, Error, AddItemInput>({
        mutationFn: (payload)=>updateItem(id, payload),
        onSuccess: ()=> {
            qc.invalidateQueries({queryKey: ["items"]})
        }
    })
}

