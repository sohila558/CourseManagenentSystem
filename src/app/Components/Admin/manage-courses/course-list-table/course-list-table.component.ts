import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Course } from "../../../../Models/course";

@Component({
  selector: 'app-course-list-table',
  imports: [CommonModule],
  templateUrl: './course-list-table.component.html',
  styleUrl: './course-list-table.component.css'
})
export class CourseListTableComponent {

  @Input() courses : Course[] | null = null;
  @Output() delete = new EventEmitter<string>();
  @Output() viewLessons = new EventEmitter<string>();

  onDelete(id : string) {
    this.delete.emit(id);
  }

  onViewLessons(id : string) {
    this.viewLessons.emit(id);
  }
}
