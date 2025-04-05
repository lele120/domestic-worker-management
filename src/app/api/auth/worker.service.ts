import axios from "axios";
import { CreateWorkerInput, CreateWorkerResponse } from "@/types/worker.types";

export async function createWorker(data: CreateWorkerInput, token: string) : Promise<CreateWorkerResponse | null> {
    try {
        const response = await axios({
        method: "post",
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "worker/",
        data: data,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating worker:", error);
        return null;
    }
}

export async function getWorkers(token: string) : Promise<CreateWorkerResponse[] | null> {
    try {
        const response = await axios({
        method: "get",
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "worker/",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching workers:", error);
        return null;
    }
}

export async function getWorkerById(id: number, token: string) : Promise<CreateWorkerResponse | null> {
    try {
        const response = await axios({
        method: "get",
        url: process.env.NEXT_PUBLIC_BACKEND_URL + `worker/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching worker with ID ${id}:`, error);
        return null;
    }
}
