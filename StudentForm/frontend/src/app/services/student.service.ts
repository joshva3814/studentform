import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/api/students';  

  private studentsSubject = new BehaviorSubject<any[]>([]); 

  constructor(private http: HttpClient) {}

  get students$(): Observable<any[]> {
    return this.studentsSubject.asObservable();
  }

  getStudents(): void {
    this.http.get<any[]>(this.apiUrl).subscribe((students) => {
      this.studentsSubject.next(students); 
    });
  }

  createStudent(student: any) {
    return this.http.post(this.apiUrl, student);
  }

  updateStudent(id: string, student: any) {
    return this.http.put(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
