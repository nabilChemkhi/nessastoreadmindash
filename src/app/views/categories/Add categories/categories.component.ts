import { Component } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

@Component({
  selector: 'app-signUpAllUser',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  name: string = '';

  selectedImage: File | null = null;
  imagePreview: string | null = null;
  faTimes = faTimes;
  image: string | null = null;


  onUsernameChange(event: Event) {
    this.name = (event.target as HTMLInputElement).value;
  }

  


  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedImage = inputElement.files[0];

      // Preview the image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.image= reader.result as string;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  removeImage() {
    this.selectedImage = null;
    this.imagePreview = null;
    
  }

  onSubmit() {
    console.log("name",this.name);
    console.log("image",this.image);
    if (!this.name || !this.image) {
      console.error('Name and image are required.');  // Add proper error handling
      return;
    }
    const headers = {
      'Content-Type': 'application/json',
      // Add any additional headers as needed
    };
    // Create form data


    // Make a POST request using Axios
    axios.post('http://localhost:8080/api/category', {
      name: this.name,
      image: this.image
    },{headers})
      .then(response => {
        console.log('Response:', response.data);
        // Add any additional logic based on the response
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle the error
      });  }
  constructor() { }

}