import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

}

// //code a reutiliser
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { ApiResponse } from './api-response.interface'; // Assurez-vous que le chemin est correct

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   private apiUrl = 'http://votre-backend/api'; // Remplacez cela par l'URL de votre backend

//   constructor(private http: HttpClient) { }

//   getProductById(id: string): Observable<ApiResponse<Product>> {
//     const url = `${this.apiUrl}/get/${id}`;
//     return this.http.get<ApiResponse<Product>>(url)
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   private handleError(error: HttpErrorResponse) {
//     let errorMessage = 'Une erreur s\'est produite côté client.';
//     if (error.error instanceof ErrorEvent) {
//       // Erreur côté client
//       errorMessage = `Erreur : ${error.error.message}`;
//     } else {
//       // Erreur côté serveur
//       errorMessage = `Code d'erreur : ${error.status}\nMessage : ${error.error}`;
//     }
//     console.error(errorMessage);
//     return throwError(errorMessage);
//   }
// }
// /********************** */
// export interface ApiResponse<T> {
//   status: number;
//   message: string;
//   data?: T;
// }
// /************************ */
// import { Component, OnInit } from '@angular/core';
// import { ProductService } from './product.service';
// import { ApiResponse } from './api-response.interface';
// import { Product } from './product.interface'; // Assurez-vous que le chemin est correct

// @Component({
//   selector: 'app-product',
//   templateUrl: './product.component.html',
//   styleUrls: ['./product.component.css']
// })
// export class ProductComponent implements OnInit {
//   product: Product | undefined;
//   productId = 'yourProductId'; // Remplacez cela par l'ID du produit que vous souhaitez récupérer

//   constructor(private productService: ProductService) { }

//   ngOnInit(): void {
//     this.productService.getProductById(this.productId)
//       .subscribe(
//         (response: ApiResponse<Product>) => {
//           if (response.status === 200) {
//             this.product = response.data;
//             console.log('Produit récupéré avec succès:', this.product);
//           } else {
//             console.error('Erreur côté serveur:', response.message);
//           }
//         },
//         error => {
//           console.error('Erreur lors de la récupération du produit:', error);
//         }
//       );
//   }
// }

