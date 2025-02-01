import { CreateEmployer } from "@/types/employer.types";
import axios from "axios";

export async function createEmployer(employer: CreateEmployer, token: string) {
    const _employer : CreateEmployer= {
        firstName: employer.firstName,
        lastName: employer.lastName,
        email: employer.email,
        phone: employer.phone,
        address: employer.address,
        city: employer.city,
        state: employer.state,
        province: employer.province,
        zipCode: employer.zipCode,
        preferredContact: employer.preferredContact,
        employmentType: employer.employmentType,
        notes: employer.notes,
        dateOfBirth: employer.dateOfBirth,
        placeOfBirth: employer.placeOfBirth,
        documentExpiration: employer.documentExpiration,
        documentIssuer: employer.documentIssuer,
        documentNumber: employer.documentNumber,
        documentType: employer.documentType,
        job: employer.job,
        nationality: employer.nationality,
        sex: employer.sex,
        taxNumber: employer.taxNumber,
        workersCount: employer.workersCount,
        status: employer.status,
        company: employer.company,
        image: employer.image,
    } 
    try {
        const response = await axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_BACKEND_URL + "employer/",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: _employer,
        });
        return response.data;
    } catch (error) {
        console.error("Error creating employer:", error);
        return null;
    }
}

export async function getEmployers(token: string) : Promise<CreateEmployer[] | undefined> {
    try {
        const response = await axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_URL + "employer/",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching employers:", error);
    }
}