import axios from 'axios';

export interface ContractType {
    id: string;
    name: string;
    description: string;
    category: string;
    subcategory: string;
}

export interface SubCategory {
    id: string;
    name: string;
    description: string;
    value: string;
}

export interface Params {
    [key: string] : string;
} 

export interface TerminationReason {
    id: string;
    name: string;
    description: string;
    value: string;
}

export interface ContractLevel {
    id: string;
    name: string;
    description: string;
    category: string;
    subcategory : string;
}

export interface ContractDeterminateReason {
    id: string;
    name: string;
    description: string;
    category: string;
    subcategory : string;
}

export async function getCotractType(params : Params , token : string): Promise<ContractType[]> {
    let url = process.env.NEXT_PUBLIC_BACKEND_URL + "contractType";
    if (params != null && Object.keys(params).length > 0) {
        url += "?";
        for (const key in params) {
            url += `${key}=${params[key]}&`;
        }
        url = url.slice(0, -1);
    }
    try {
        const response = await axios({
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            url: url,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching contract type:", error);
        return [];
    }
}

export async function getSubCategories(token : string): Promise<SubCategory[]> {
    try {
        const response = await axios({
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            url: process.env.NEXT_PUBLIC_BACKEND_URL + "contractSubcategory",
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching sub category:", error);
        return [];
    }
}

export async function getTerminationReasons(token : string): Promise<TerminationReason[]> {
    try {
        const response = await axios({
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            url: process.env.NEXT_PUBLIC_BACKEND_URL + "contractTerminationReason",
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching termination reasons:", error);
        return [];
    }
}

export async function getContractLevel(params : Params, token : string): Promise<ContractLevel[]> {
    let url = process.env.NEXT_PUBLIC_BACKEND_URL + "contractLevel";
    if (params != null && Object.keys(params).length > 0) {
        url += "?";
        for (const key in params) {
            url += `${key}=${params[key]}&`;
        }
        url = url.slice(0, -1);
    }
    try {
        const response = await axios({
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            url: url,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching contract level:", error);
        return [];
    }
}

export async function getContractDeterminateReason(params: Params, token: string): Promise<ContractDeterminateReason[]> {
    let url = process.env.NEXT_PUBLIC_BACKEND_URL + "contractDeterminateReason";
    if (params != null && Object.keys(params).length > 0) {
        url += "?";
        for (const key in params) {
            url += `${key}=${params[key]}&`;
        }
        url = url.slice(0, -1);
    }
    try {
        const response = await axios({
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            url: url,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching contract determinate reason:", error);
        return [];
    }
}


