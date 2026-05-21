import { useQuery } from "@tanstack/react-query";

import {getAllDisposal} from "../../../api/disposal"

export const useDisposalAll = () => useQuery<string[]>({
    queryKey: ["disposal"],
    queryFn: ()=> getAllDisposal(),
   
});

