import { Timestamp } from '@angular/fire/firestore';

export interface Recipe {
  id: string;
  Date: Timestamp;
  DoctorName: string;
  DoctorAddress: string;
  PatientId: string;
  MedicationId: string;
  ValidTo: Timestamp;
  Count: string;
  Used: boolean;
  Morning: boolean;
  Lunch: boolean;
  Evening: boolean;
}
