import axios from "axios";
import { createWorkerInput, createWorkerResponse } from "@/types/worker.types";

export async function createWorker(data: createWorkerInput, token: string) : Promise<createWorkerResponse | null> {
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
