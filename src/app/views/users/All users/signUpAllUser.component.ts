import { Component } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {ClientRegistrationDto} from "../../../../models/client-registration.dto";
import {AuthService} from "../../../services/auth-service.service";
import { FormControl,NgModel,FormBuilder, FormGroup, Validators} from "@angular/forms";




@Component({
  //selector: 'app-signUpAllUser',
  selector: 'app-sign-up-all-user',
  templateUrl: './signUpAllUser.component.html',
  styleUrls: ['./signUpAllUser.component.scss']
})
export class SignUpAllUserComponent {

  signUpForm!: FormGroup;

  // username: string = 'front';
  // email: string = 'testFront@gmail.com';
  // password: string = '12345678';
  // repeatPassword: string = '12345678';
  // selectedImage: File | null = null;
  // imagePreview: string | null = null;
  // faTimes = faTimes;
  // selectedRole: string = 'client'; // Default role is set to 'client'

  constructor(private authService: AuthService , private fb: FormBuilder) {

    this.signUpForm = this.fb.group({
      // ...
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      role: [''],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });

  }


  ngOnInit() {

  }

  // Getter method for easy access to form controls in the template
  get formControls() {
    return this.signUpForm.controls;
  }
  // get emailControl() {
  //   return this.signUpForm.get('email');
  // }



  // onUsernameChange(event: Event) {
  //   this.username = (event.target as HTMLInputElement).value;
  // }

  // onEmailChange(event: Event) {
  //   this.email = (event.target as HTMLInputElement).value;
  // }
  //
  // onPasswordChange(event: Event) {
  //   this.password = (event.target as HTMLInputElement).value;
  // }
  //
  // onRepeatPasswordChange(event: Event) {
  //   this.repeatPassword = (event.target as HTMLInputElement).value;
  // }
  // onRoleChange(event: Event) {
  //   this.selectedRole = (event.target as HTMLSelectElement).value;
  // }


  onFileSelected(event: Event) {
    // const inputElement = event.target as HTMLInputElement;
    // if (inputElement.files && inputElement.files.length > 0) {
    //   this.selectedImage = inputElement.files[0];
    //
    //   // Preview the image
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     this.imagePreview = reader.result as string;
    //   };
    //   reader.readAsDataURL(this.selectedImage);
    // }
  }

  // removeImage() {
  //   this.selectedImage = null;
  //   this.imagePreview = null;
  //
  // }






  onSubmit() {

    console.log('Submit button clicked');
    if (this.signUpForm.valid) {

      console.log('valid');

      const registrationDto: ClientRegistrationDto = {
        fullName: this.signUpForm.value.username,
        email: this.signUpForm.value.email,
        phoneNumber: this.signUpForm.value.phoneNumber,
        role: this.signUpForm.value.role,
        password: this.signUpForm.value.password,
        status: 'ACTIVE',

      };

      console.log( this.signUpForm.value +this.signUpForm.value.username);
      this.authService.registerUser(registrationDto).subscribe(
        () => {
          // Registration successful, add any success logic here
          console.log('User registered successfully');
        },
        (error) => {
          // Handle registration error
          console.error('Error registering user:', error);
        }

      );

    }
    else {
      console.log('non valid');
    }

    console.log('UsernameForm:', this.signUpForm.value.username);

   }

  isFieldValid(fieldName: string): false | undefined | boolean {

    const control = this.signUpForm.get(fieldName);
    // Check if the control is touched and invalid
    return control?.touched && control?.invalid;

  }


}
