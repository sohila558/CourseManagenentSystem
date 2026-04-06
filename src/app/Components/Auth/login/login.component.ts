import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Store } from '@ngrx/store';
import { selectAuthError, selectAuthLoading } from '../../../Store/Auth/auth.selector';
import { login } from '../../../Store/Auth/auth.action';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  private fb = inject(FormBuilder);
  private store = inject(Store);
  
  loginForm!: FormGroup;
  
  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError); 
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if(this.loginForm.valid){
      const { email, password } = this.loginForm.value;
      this.store.dispatch(login({email, password}));
    }
  }

}
