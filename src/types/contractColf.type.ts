import { CreateEmployer } from "./employer.types";
import { CreateWorkerResponse } from "./worker.types";

export interface ContractColf {
    id: number;
    contractNumber: string;
    status: Status;
    startDate: string;
    endDate: string;
    totalValue: number;
    currencyCode: string;
    governingLaw: string;
    autoRenewal: boolean;
    renewalNoticeDays: number;
    createdAt: string;
    updatedAt: string;
    createdBy: number;
    isTerminated: boolean;
    isFixedTerm: boolean;
    terminationReason: string;
    type: string;
    worker: CreateWorkerResponse;
    employer: CreateEmployer;
}

export interface Status {
    id: string;
    name: string;
    description: string;
    isTerminal: boolean;
}

