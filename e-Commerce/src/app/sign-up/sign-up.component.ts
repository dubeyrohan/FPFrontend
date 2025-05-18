import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signupForm!: FormGroup;  // Using definite assignment assertion
  passwordVisible = false;
  confirmPasswordVisible = false;
  formSubmitted = false;
  errorHandler = false;
  errorMessage: string | null = null;
 // isLoading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // Initialize form in constructor
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      ]],
      confirmPassword: ['', [Validators.required]],
      termsAccepted: [false, [Validators.requiredTrue]]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  // Custom validator to check if passwords match
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.formSubmitted = true;
    
    if (this.signupForm.invalid) {
      return;
    }
    console.log(this.signupForm);
    const rqstBody={
      id:this.getId(),
      email:this.signupForm.controls['email'].value,
      password: this.signupForm.controls['password'].value,
      confirmPassword: this.signupForm.controls['confirmPassword'].value,
      firstName: this.signupForm.controls['firstName'].value,
      lastName:this.signupForm.controls['lastName'].value,
      termsAccepted: this.signupForm.controls['termsAccepted'].value,
      
    }
    console.log(rqstBody);
    // Form is valid, proceed with signup
    console.log('Signup form submitted:', this.signupForm.value);
    //this.isLoading = true;
  
    // This simulates a backend error after 1.5 seconds
    setTimeout(() => {
      this.showErrorAlert('Error is coming');
      //this.isLoading = false;
    }, 1500);
  }
    // Add your registration logic here
  //  if(true){
  //     this.router.navigate(['/login']);
  //   }
  //   else{
  //    // this.errorHandler = true;
  //    this.showErrorAlert("xxxxx")
     
  //   }
  // }
  showErrorAlert(message: string) {
    this.errorMessage = message;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      this.errorMessage = null;
    }, 5000);
  }
  getId(){
    return '';
  }
  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }

}