import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  passwordVisible = false;
  formSubmitted = false;
  errorMessage: string | null = null; // Added for error alert

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      ]],
      rememberMe: [false]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.formSubmitted = true;
    
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm);
    const rqstBody={
      email:this.loginForm.controls['email'].value,
      //id:this.getId(),
      password: this.loginForm.controls['password'].value,
      
    }
    console.log(rqstBody);
    // Form is valid, proceed with login
    //console.log('Login form submitted:', this.loginForm.value);
    // Add your authentication logic here
    //this.router.navigate(['/home']);

    this.showErrorAlert("Error is coming");
    // In real implementation, you would:
    // 1. Call your auth service
    // 2. On error, call this.showError(error.message)
    // 3. On success, navigate to home
    // this.router.navigate(['/home']);
  }

  // Added method for showing errors
  showErrorAlert(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = null;
    }, 5000); // Auto-hide after 5 seconds
  }
  
  signupForm(){
    this.router.navigate(['/signup']);
  }
  
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
