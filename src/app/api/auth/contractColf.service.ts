import axios from "axios";
import {CreateContractColf } from '@/types/contract.types';
import { ContractColf } from '@/types/contractColf.type';


export async function createContractColf(contractColf: CreateContractColf, token: string) {
    try {
        const response = await axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_BACKEND_URL + "contractColf/",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: contractColf,
        });
        return response.data;
    } catch (error) {
        console.error("Error creating contractColf:", error);
        return null;
    }
}

export async function listContractColf(token: string) : Promise<ContractColf[] | undefined> {
    try {
        const response = await axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_URL + "contractColf/",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error listing contractColf:", error);
    }
}