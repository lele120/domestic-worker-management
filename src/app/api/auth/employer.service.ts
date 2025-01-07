import { _CreateEmployer, CreateEmployer } from "@/types/employer.types";
import axios from "axios";

export async function createEmployer(employer: CreateEmployer, token: string) {
    const _employer : _CreateEmployer= {
        first_name: employer.firstName,
        last_name: employer.lastName,
        email: employer.email,
        phone: employer.phone,
        address: employer.address,
        city: employer.city,
        state: employer.state,
        province: employer.province,
        zip_code: employer.zipCode,
        preferred_contact: employer.preferredContact,
        employment_type: employer.employmentType,
        notes: employer.notes,
        date_of_birth: employer.dateOfBirth,
        place_of_birth: employer.placeOfBirth,
        document_expiration: employer.documentExpiration,
        document_issuer: employer.documentIssuer,
        document_number: employer.documentNumber,
        document_type: employer.documentType,
        job: employer.job,
        nationality: employer.nationality,
        sex: employer.sex,
        tax_number: employer.taxNumber,
        workers_count: employer.workersCount,
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

export async function getEmployers(token: string) : Promise<_CreateEmployer[] | undefined> {
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