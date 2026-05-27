import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem } from "../../../api/items";

import type {AddItem, AddItemInput} from "../../../types/Item";

export function useCreateItem(){
    const qc = useQueryClient()
    return useMutation<AddItem, Error, AddItemInput> ({
        mutationFn: createItem,
        onSuccess: () =>{
            qc.invalidateQueries({queryKey: ["items"]})
        },
    });
}

