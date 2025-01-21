
export interface IIntakeForm {
  emergencyContactName: string;
  emergencyContactPhone: string;
  currentMedications: Record<string, any>;
  allergies: Record<string, any>;
  medicalHistory: Record<string, any>;
  patientid: string;
}
