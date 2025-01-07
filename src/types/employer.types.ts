export interface CreateEmployer {
    firstName: string;
    lastName: string;
    sex: 'male' | 'female' | 'other';
    dateOfBirth: string;
    placeOfBirth: string;
    nationality: string;
    taxNumber: string;
    job: string;
    documentType: string;
    documentNumber: string;
    documentIssuer: string;
    documentExpiration: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    province: string;
    zipCode: string;
    preferredContact: 'email' | 'phone';
    employmentType: 'full-time' | 'part-time' | 'temporary';
    notes: string;
    status: 'active' | 'inactive' | 'terminated';
    image?: string;
    workersCount: number;
    id?: number;
    company?: string;
  }

  export interface _CreateEmployer {
    id?: number;
    first_name: string;
    last_name: string;
    sex: 'male' | 'female' | 'other';
    date_of_birth: string;
    place_of_birth: string;
    nationality: string;
    tax_number: string;
    job: string;
    document_type: string;
    document_number: string;
    document_issuer: string;
    document_expiration: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    province: string;
    zip_code: string;
    preferred_contact: 'email' | 'phone';
    employment_type: 'full-time' | 'part-time' | 'temporary';
    notes: string;
    status: 'active' | 'inactive' | 'terminated';
    image?: string;
    workers_count: number;
    company?: string;
    }