export interface createWorkerInput {
    employerId: number | null;
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
}

export interface createWorkerResponse {
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
}

