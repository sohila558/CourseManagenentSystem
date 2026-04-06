import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { User } from '../../../../Models/user';
import { Enrollment } from '../../../../Models/enrollments';

@Component({
  selector: 'app-user-list-table',
  imports: [CommonModule],
  templateUrl: './user-list-table.component.html',
  styleUrl: './user-list-table.component.css'
})
export class UserListTableComponent implements OnChanges {
  // Reciving Data From The Parent "Manage Users"
  @Input() users: User[] | null = [];
  @Input() allEnrollments: Enrollment[] = [];
  
  // Sending Orders to The Parent
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<User>();
  
  enrollmentMap: { [key: string]: string } = {};
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allEnrollments'] && this.allEnrollments) {
      console.log('Enrollments received in Table:', this.allEnrollments); // شوفيها في الـ Console
      this.updateEnrollmentMap();
    }
  }

  updateEnrollmentMap() {
    this.enrollmentMap = {};
    this.allEnrollments?.forEach(e => {
      const studentId = String(e.studentId).trim();
      if (this.enrollmentMap[studentId]) {
        this.enrollmentMap[studentId] += `, ${e.courseTitle}`;
      } else {
        this.enrollmentMap[studentId] = e.courseTitle;
      }
    });
  }

  getStudentCourses(userId: string): string {
    return this.allEnrollments
      .filter(e => e.studentId === userId)
      .map(e => e.courseTitle)
      .join(', ') || 'No Enrollments';
  }

  onDelete(id: string) {
    this.delete.emit(id);
  }

  onEdit(user: User) {
    this.edit.emit(user);
  }
}
