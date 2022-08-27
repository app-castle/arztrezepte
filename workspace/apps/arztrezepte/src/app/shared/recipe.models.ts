export interface Recipe {
  id: string;
  Date: string;
  DoctorName: string;
  DoctorAddress: string;
  PatientId: string;
  MedicationId: string;
  ValidTo: string;
  Count: string;
  Used: string;
  Morning: boolean;
  Lunch: boolean;
  Evening: boolean;
}
