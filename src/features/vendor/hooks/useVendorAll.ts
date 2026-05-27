
import { useQuery } from "@tanstack/react-query";
import {getAllVendor} from "../../../api/vendor";
import type { Vendor } from "../../../types/Vendor";


export const useVendorAll = () => useQuery<Vendor[]>({
    queryKey: ["vendor"],
    queryFn: () => getAllVendor(),
})