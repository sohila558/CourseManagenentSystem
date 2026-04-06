import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from '../../../../Models/user';
import { addUser, updateUser } from '../../../../Store/Users/Users.action';

@Component({
  selector: 'app-add-user-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-user-modal.component.html',
  styleUrl: './add-user-modal.component.css'
})
export class AddUserModalComponent implements OnInit, OnChanges{
  
  private _fb = inject(FormBuilder);
  private _store = inject(Store);
  @Input() userToEdit: User | null = null; 
  userForm! : FormGroup;
  
  ngOnInit(): void {
    this.userForm = this._fb.group({
      name : ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email : ["", [Validators.required, Validators.email]],
      password : ["P@ssW0rd123", [Validators.required]],
      role : ["Student", [Validators.required]]
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.userToEdit) {
      this.userForm?.patchValue(this.userToEdit);
    } else {
      this.userForm?.reset({ role: "Student", password: "P@ssW0rd123" });
    }
  }

  onSubmit(){
    if (this.userForm.valid) {
      if (this.userToEdit) {
        const updatedUser = { ...this.userToEdit, ...this.userForm.value };
        this._store.dispatch(updateUser({ user: updatedUser }));
      } else {
        const newUser = { 
          ...this.userForm.value, 
          id: Math.floor(Math.random() * 1000).toString() 
        };
        this._store.dispatch(addUser({ user: newUser }));
      }
      this.userForm.reset({ role: "Student", password: "P@ssW0rd123" });
    }
  }

}
