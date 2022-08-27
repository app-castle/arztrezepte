import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Patient } from './patient.models';

@Injectable({ providedIn: 'root' })
export class PatientService {
  private ref: AngularFirestoreCollection<Patient>;

  constructor(afs: AngularFirestore) {
    this.ref = afs.collection('Patients');
  }

  getAll(): Observable<Patient[]> {
    return this.ref.snapshotChanges().pipe(
      map((changes) =>
        changes.map((change) => ({
          id: change.payload.doc.id,
          ...change.payload.doc.data(),
        }))
      )
    );
  }

  create(payload: Patient) {
    return this.ref.add({ ...payload });
  }

  update(id: string, payload: Patient) {
    return this.ref.doc(id).update(payload);
  }

  delete(id: string) {
    return this.ref.doc(id).delete();
  }
}
