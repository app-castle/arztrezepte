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
          ...change.payload.doc.data(),
          id: change.payload.doc.id,
        }))
      )
    );
  }

  get(id: string) {
    return this.ref
      .doc(id)
      .get()
      .pipe(
        map(
          (doc) =>
            ({
              ...doc.data(),
              id: doc.id,
            } as Patient)
        )
      );
  }

  create(payload: Partial<Patient>) {
    delete payload.id;
    return this.ref.add({ ...payload } as Patient);
  }

  update(id: string, payload: Partial<Patient>) {
    delete payload.id;
    return this.ref.doc(id).update(payload);
  }

  delete(id: string) {
    return this.ref.doc(id).delete();
  }
}
