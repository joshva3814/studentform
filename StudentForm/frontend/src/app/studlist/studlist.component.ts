import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-studlist',
  imports:[CommonModule],
  templateUrl: './studlist.component.html',
  styleUrls: ['./studlist.component.css']
})
export class StudlistComponent implements OnInit {
  otherstudents: any[] = [];
  
  constructor(
    private studentService: StudentService,   ) 
    {}
  
  ngOnInit(): void {
    this.studentService.students$.subscribe((students) => {  
      this.otherstudents = students; 
    });
  }
 
}
