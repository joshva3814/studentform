import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentEditService {
  private editingStudentSubject = new BehaviorSubject<any>(null);

  setEditingStudent(student: any) {
    this.editingStudentSubject.next(student);
  }

  getEditingStudent() {
    return this.editingStudentSubject.asObservable();
  }
}
