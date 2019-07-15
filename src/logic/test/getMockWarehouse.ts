import { stubTrue } from "lodash";
import { IWarehouse } from "../IWarehouse";
import { doNothing } from "./doNothing";
import { getMockWare } from "./getMockWare";

export const getMockWarehouse = (): IWarehouse => {
    return {
        get: () => getMockWare(),
        hasSufficientWares: stubTrue,
        store: doNothing,
        take: doNothing,
    };
};
