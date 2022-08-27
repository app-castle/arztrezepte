import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { forkJoin, map, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MedicationService } from './medication.service';
import { Recipe } from './recipe.models';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private ref: AngularFirestoreCollection<Recipe>;

  constructor(afs: AngularFirestore, private medsService: MedicationService) {
    this.ref = afs.collection('Recipes');
  }

  getAll(): Observable<Recipe[]> {
    return this.ref.snapshotChanges().pipe(
      map((changes) =>
        changes.map((change) => ({
          ...change.payload.doc.data(),
          id: change.payload.doc.id,
        }))
      )
    );
  }

  getAllOfPatient(patientId: string) {
    return this.getAll().pipe(
      map((recipes) => recipes.filter((r) => r.PatientId === patientId)),
      switchMap((recipes) =>
        forkJoin(
          recipes.map((r) =>
            this.medsService
              .get(r.MedicationId)
              .pipe(map((med) => ({ ...r, medication: med })))
          )
        )
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
            } as Recipe)
        )
      );
  }

  create(payload: Partial<Recipe>) {
    delete payload.id;
    return this.ref.add({ ...payload } as Recipe);
  }

  update(id: string, payload: Partial<Recipe>) {
    delete payload.id;
    return this.ref.doc(id).update(payload);
  }

  delete(id: string) {
    return this.ref.doc(id).delete();
  }
}
