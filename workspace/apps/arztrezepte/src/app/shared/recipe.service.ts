import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Recipe } from './recipe.models';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private ref: AngularFirestoreCollection<Recipe>;

  constructor(afs: AngularFirestore) {
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

  get(id: string) {
    return this.ref
      .doc(id)
      .get()
      .pipe(
        map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
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
