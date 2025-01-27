import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StudentFormService {
  private studentFormSubject = new BehaviorSubject<FormGroup | null>(null);

  setStudentForm(form: FormGroup) {
    this.studentFormSubject.next(form);
  }

  updateFormValue(formValues: any) {
    const form = this.studentFormSubject.value;
    if (form) {
      form.setValue(formValues);
    }
  }
}
