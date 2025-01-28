import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';  // Keep this import
import { StudentFormService } from '../services/student-form.service';
import { StudentEditService } from '../services/student-edit.service';

@Component({
  selector: 'app-student-list',
  imports: [CommonModule],  // Ensure only necessary modules are here
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  editingStudent: any;
  studentForm: any;

  constructor(
    private studentService: StudentService, 
    private studentFormService: StudentFormService,
    private studentEditService: StudentEditService
  ) {}

  ngOnInit(): void {
    this.studentService.students$.subscribe((students) => {
      this.students = students; 
    });
  }

  editStudent(student: any): void {
    this.studentFormService.updateFormValue({
      name: student.name,
      rollNumber: student.rollNumber,
      age: student.age,
      address: student.address,
      email: student.email,
      phone: student.phone
    });
    this.studentEditService.setEditingStudent(student); 
  }

  deleteStudent(id: string): void {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.studentService.getStudents();
    });
  }
}
