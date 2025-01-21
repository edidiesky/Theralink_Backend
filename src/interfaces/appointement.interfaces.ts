export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export interface IAppointment {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: Gender;
    dateOfBirth: Date;
    address: string;
    medicalHistory?: Record<string, any>;
}
