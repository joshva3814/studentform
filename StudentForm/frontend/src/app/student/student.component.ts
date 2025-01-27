import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student',
  imports : [CommonModule,ReactiveFormsModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: any[] = [];
  studentForm: FormGroup;
  editingStudent: any = null;

  constructor(private fb: FormBuilder, private studentService: StudentService) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      rollNumber: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(1)]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['',[Validators.required,Validators.maxLength(10)]]  
    });
    
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

  onSubmit() {
    console.log(this.studentForm.value); 
    if (this.studentForm.invalid) {
      return; 
    }
  
    const student = this.studentForm.value;
  
    if (this.editingStudent) {
      console.log("Updating student", student);
      this.studentService.updateStudent(this.editingStudent._id, student).subscribe((_updatedStudent) => {
        this.loadStudents();
        this.studentForm.reset();
        this.editingStudent = null;
      });
    } else {
      console.log("Creating new student", student);

      this.studentService.createStudent(student).subscribe((_newStudent) => {
        this.loadStudents();
        this.studentForm.reset();
      });
    }
  }
  
  editStudent(student: any) {
    this.editingStudent = student;
    this.studentForm.setValue({
      name: student.name,
      rollNumber: student.rollNumber,
      age: student.age,
      address: student.address,
      email: student.email,
      phone: student.phone
    });
    this.studentForm.get('name')?.disable();     
    this.studentForm.get('age')?.disable();      
    this.studentForm.get('rollNumber')?.disable();
  }

  deleteStudent(id: string) {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }
}
