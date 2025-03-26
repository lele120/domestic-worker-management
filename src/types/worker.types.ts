export interface CreateWorkerInput {
    employerId: number | null | undefined;
    firstName: string;
    lastName: string
    dateOfBirth: string;    
    placeOfBirth : string;
    mobile : string;
    nationality : string;
    sex : string;     
    taxNumber : string;       
    zipCode : string; 
    documentExpiration : string; 
    status : string;
    documentType : string;
    documentNumber : string;
    documentIssuer : string; 
    email : string; 
    phone : string;
    address : string; 
    city : string;
    state : string; 
    province : string; 
    image: string | null;
    permitType?: string;
    permitReason?: string;
    questura?: string;
    permitNumber?: string;
    permitIssueDate?: string;
    permitExpiryDate?: string;
}

export interface CreateWorkerResponse {
    id: number;
    employerId: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    placeOfBirth: string
    mobile : string;
    nationality : string;
    sex : string;     
    taxNumber : string;       
    zipCode : string; 
    documentExpiration : string; 
    status : string;
    documentType : string;
    documentNumber : string;
    documentIssuer : string; 
    email : string; 
    phone : string;
    address : string; 
    city : string;
    state : string; 
    province : string; 
    image?: string;
}

