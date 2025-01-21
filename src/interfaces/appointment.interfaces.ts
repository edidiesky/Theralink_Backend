export enum AppointmentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface IAppointment {
  date: string;
  status: AppointmentStatus;
  patientid: string;
}
