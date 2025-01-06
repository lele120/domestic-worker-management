import axios from "axios";


export async function getPlans () {
    try {
        const response =  await axios({
        method: "get",
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "plan/",
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching plans:", error);
        return null;
    }
}

export async function createSubscription(plan : number, start_date: string, end_date: string, is_payment_monthly: string ,token: string) {
    try {
        const response = await axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_BACKEND_URL + "subscription/",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                plan,
                start_date,
                end_date,
                is_payment_monthly,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating subscription:", error);
        return null;
    }
}