import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Medication } from './medication.models';

@Injectable({ providedIn: 'root' })
export class MedicationService {
  private ref: AngularFirestoreCollection<Medication>;

  constructor(afs: AngularFirestore) {
    this.ref = afs.collection('Medication');
  }

  getAll(): Observable<Medication[]> {
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
            } as Medication)
        )
      );
  }

  create(payload: Partial<Medication>) {
    delete payload.id;
    return this.ref.add({ ...payload } as Medication);
  }

  update(id: string, payload: Partial<Medication>) {
    delete payload.id;
    return this.ref.doc(id).update(payload);
  }

  delete(id: string) {
    return this.ref.doc(id).delete();
  }
}
