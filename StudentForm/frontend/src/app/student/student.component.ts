import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';
import { StudentFormService } from '../services/student-form.service';
import { StudentEditService } from '../services/student-edit.service';
import { StudlistComponent } from '../studlist/studlist.component';
import { StudentListComponent } from '../student-list/student-list.component';

@Component({
  selector: 'app-student',
  imports :[ReactiveFormsModule,CommonModule,StudentListComponent,StudlistComponent],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: any[] = [];
  studentForm: FormGroup;
  editingStudent: any = null;

  constructor(
    private fb: FormBuilder, 
    private studentService: StudentService,
    private studentFormService: StudentFormService,
     private studentEditService: StudentEditService)
      {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      rollNumber: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(1)]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(10)]]
    });
    this.studentFormService.setStudentForm(this.studentForm);
  }

  ngOnInit(): void {
    this.loadStudents();
    this.studentEditService.getEditingStudent().subscribe((student) => {   
      if (student) {
        this.editingStudent = student;
        this.studentForm.setValue({
          name: student.name,
          rollNumber: student.rollNumber,
          age: student.age,
          address: student.address,
          email: student.email,
          phone: student.phone
        });
      }
    });
  }

  loadStudents() {
    this.studentService.getStudents();
  }

  onSubmit() {
    if (this.studentForm.invalid) {
      return;
    }

    const student = this.studentForm.value;

    if (this.editingStudent) {
      this.studentService.updateStudent(this.editingStudent._id, student).subscribe(() => {
        this.loadStudents();
        this.studentForm.reset();
        this.editingStudent = null;
      });
    } else {
      this.studentService.createStudent(student).subscribe(() => {
        this.loadStudents();
        this.studentForm.reset();
      });
    }
  }
}
