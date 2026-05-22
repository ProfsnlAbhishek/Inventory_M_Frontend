export interface Type{
    typeID?: number;
    type: string
    mfgr: string;
    model: string;
    comments?: string;
}

export type TypeInput = Omit<Type, `typeID`>;