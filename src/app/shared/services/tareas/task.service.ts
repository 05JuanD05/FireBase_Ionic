import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Task {
  id?: string;
  title: string;
  description: string;
  date: string;
  done: boolean;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private firestore: AngularFirestore) {}

  // Crear tarea
  createTask(task: Task) {
    return this.firestore.collection('tasks').add(task);
  }

  // Obtener tareas por UID
  getTasks(userId: string): Observable<Task[]> {
    return this.firestore.collection('tasks', ref => ref.where('userId', '==', userId))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Task; // Definimos que los datos son de tipo Task
          const id = a.payload.doc.id;
          return { id, ...data }; // Spread operator ahora debería funcionar
        }))
      );
  }

  // Actualizar tarea
  updateTask(id: string, task: Task) {
    return this.firestore.collection('tasks').doc(id).update(task);
  }

  // Eliminar tarea
  deleteTask(id: string) {
    return this.firestore.collection('tasks').doc(id).delete();
  }
}
