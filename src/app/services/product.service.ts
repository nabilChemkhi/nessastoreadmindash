
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, of, throwError} from 'rxjs';
import {ProductDto} from "../../models/product.dto ";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/product';

  constructor(private http: HttpClient) {}

  createProduct(formData:FormData): Observable<string> {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    //{ headers: headers }

    return this.http.post<any>(`${this.apiUrl}/createProduct`, formData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // Gérer les erreurs côté client
            console.error('Une erreur s\'est produite côté client :', error.error.message);
          } else {
            // Gérer les erreurs côté serveur
            console.error('Réponse du serveur :', error);

            if (error.status === 201) {
              // Gérer le cas où le statut est 201 (Created)
              console.log('Produit créé avec succès. ID du produit :', error.error.text);
              // Vous pouvez renvoyer l'ID du produit ou effectuer d'autres actions nécessaires ici
              return of(error.error.text); // Renvoyer l'ID du produit
            }
          }

          // Renvoyer une erreur observable avec le détail de l'erreur
          return throwError('Quelque chose s\'est mal passé! Veuillez réessayer plus tard.');
        })
      );

  }


  createProductToFirestore(product: ProductDto): Observable<string> {
    //const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json'
    // });

    return this.http.post<any>(`${this.apiUrl}/create`, product)//, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            console.error('Une erreur s\'est produite côté client :', error.error.message);
          } else {
            console.error('Réponse du serveur :', error);

            if (error.status === 201) {
              console.log('Produit créé avec succès. ID du produit :', error.error.text);
              return throwError(error.error.text);
            }
          }

          return throwError('Quelque chose s\'est mal passé! Veuillez réessayer plus tard.');
        })
      );
  }

  // createProduct( image: File, product: ProductDto): Observable<string> {
  //   const formData: FormData = new FormData();
  //   formData.append('image', image, image.name);
  //   formData.append('product', JSON.stringify(product));
  //
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'multipart/form-data');
  //
  //   return this.http.post<string>(this.apiUrl, formData, { headers });
  // }
  /**********/
  // createProduct(product: ProductDto, image: File): Observable<string> {
  //   const formData = new FormData();
  //   formData.append('image', image, image.name);
  //   // Directly append the product object, avoiding unnecessary stringification
  //   formData.append('product', product);
  //
  //       return this.http.post<string>(this.apiUrl, formData)
  //     .pipe(
  //         retry(1), // Retry once in case of transient errors
  //       catchError(error => {
  //       // Handle errors gracefully, log or display user-friendly messages
  //       console.error('Error creating product:', error);
  //       return throwError(() => new Error('Failed to create product'));
  //     })
  //     );
  // }




}
