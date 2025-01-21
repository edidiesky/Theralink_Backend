export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export interface IPatient {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: Gender;
    dateOfBirth: Date;
    address: string;
    medicalHistory?: Record<string, any>;
}
