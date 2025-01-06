import axios from "axios";


export async function getPlans () {
    try {
        const response =  await axios({
        method: "get",
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "plans/",
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching plans:", error);
        return null;
    }
}