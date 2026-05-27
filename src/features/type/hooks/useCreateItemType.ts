import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItemType } from "../../../api/type";


import type {Type, TypeInput} from "../../../types/Type";


export function useCreateItemType(){
    const qc = useQueryClient();
    return useMutation<Type, Error, TypeInput>({
        mutationFn: createItemType,
        onSuccess: () => {
            qc.invalidateQueries({queryKey: ["itemType"]})
        }
    })
}