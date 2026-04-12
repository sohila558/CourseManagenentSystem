import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllUsers } from '../../../../Store/Users/Users.selector';
import { deleteUser, loadUsers, updateUser } from '../../../../Store/Users/Users.action';
import { UserListTableComponent } from "../user-list-table/user-list-table.component";
import { AsyncPipe } from '@angular/common';
import { User } from '../../../../Models/user';
import { AddUserModalComponent } from "../add-user-modal/add-user-modal.component";
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { selectAllEnrollments } from '../../../../Store/Enrollments/enrollment.selector';
import { loadEnrollments } from '../../../../Store/Enrollments/enrollment.action';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-users',
  imports: [UserListTableComponent, AsyncPipe, AddUserModalComponent],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent implements OnInit {

  private _route = inject(ActivatedRoute);
  private _store = inject(Store);
  private _toastr = inject(ToastrService);
  private _searchTerm$ = new BehaviorSubject<string>('');
  selectedUser: User | null = null;

  data$ = combineLatest([
    this._store.select(selectAllUsers),
    this._store.select(selectAllEnrollments),
    this._searchTerm$,
    this._route.queryParamMap
  ]).pipe(
    map(([users, enrollments, searchTerm, queryParams]) => {
      const roleFilter = queryParams.get('role');

      let filteredUsers = roleFilter ? users.filter(u => u.role === roleFilter) : users;

      if (searchTerm.trim()) {
        filteredUsers = filteredUsers.filter(user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      return { users: filteredUsers, enrollments };
    })
  );

  onSearch(event: any) {
    const value = event.target.value;
    this._searchTerm$.next(value);
  }

  ngOnInit(): void {
    this._store.dispatch(loadUsers());
    this._store.dispatch(loadEnrollments());
    this._store.select(selectAllEnrollments).subscribe(data => {
      console.log('Data directly from Store Selector:', data);
    });
  }

  handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this User?')) {
      this._store.dispatch(deleteUser({ id }));
      this._toastr.error('User deleted successfully!', 'Deleted');
    }
  }

  handleEdit(user: User) {
    this.selectedUser = user;
    console.log('Edit user:', user);
  }

  clearSelectedUser() {
    this.selectedUser = null;
  }

}
