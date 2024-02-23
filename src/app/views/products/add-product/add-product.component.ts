import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {ProductDto} from "../../../../models/product.dto ";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-add-product',
  //standalone: true,
  //imports: [CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit{


  public imagePath!:any;
  imgURL!: any;
  userFile!: File;
  //public message!: string;

    //sizes =  [];

  categList: Category[] = [
    { id: 1, name: 'Category 1', subcategories: ['Subcat 1.1', 'Subcat 1.2'] },
    { id: 2, name: 'Category 2', subcategories: ['Subcat 2.1', 'Subcat 2.2'] },
    // ... ajoutez d'autres catégories
  ];

  selectedCategory: Category | null = null;
  selectedSubcategory: string | null = null;


  get categoryControl() {
    return this.productForm.get('category');
  }

  get subcategoryControl() {
    return this.productForm.get('subcategory');
  }

  onCategoryChange() {
    const selectedCategory = this.categoryControl?.value as Category;

    if (selectedCategory) {
      this.subcategoryControl?.setValue('');
      this.subcategoryControl?.enable();
    } else {
      this.subcategoryControl?.setValue('');
      this.subcategoryControl?.disable();
    }
  }



  productForm!: FormGroup;
  //product?: ProductDto;
   product: ProductDto = {
    id: '',
    title: 'Nom du produit',
    description: 'Description du produit',
    quantity: 10,
    discount: 5,
    price: 100,
    discountedPrice: 95,
    coverImgUrl: 'chemin/vers/image.jpg',
    size: ['S', 'M', 'L'],
    colour: [
      { position: '1', colour: 'Rouge' },
      { position: '2',colour: 'Bleu' }
    ],
    images: [
      { position: '1',imageUrl: 'chemin/vers/image1.jpg' },
      { position: '2', imageUrl: 'chemin/vers/image2.jpg' }
    ],
    subCategoryId: 'abc123'
  };



  constructor(private productService: ProductService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.productForm = this.formBuilder.group({
    title: '',
    description: '',
    quantity:'',
    discount: '',
    price: '',
    discountedPrice: '',
    coverImage: '',
    sizes: this.formBuilder.array([]),
    //sizes: [[]],
    // colour: [
    //   { position: '1', colour: 'Rouge' },
    //   { position: '2',colour: 'Bleu' }
    // ],
    colours: this.formBuilder.array([]),

    category: [''],
    subcategory: ['']
    });



     // Ajoutez un écouteur d'événements pour mettre à jour discountedPrice lors de la modification de discount ou price
     this.productForm.get('discount')?.valueChanges.subscribe(() => {
      this.updateDiscountedPrice();
    });

    this.productForm.get('price')?.valueChanges.subscribe(() => {
      this.updateDiscountedPrice();
    });

    //this.addSizeField();
    sizes: this.formBuilder.array([])
  }

//discount

  updateDiscountedPrice() {
    const priceControl = this.productForm.get('price') as AbstractControl;
    const discountControl = this.productForm.get('discount') as AbstractControl;
    const discountedPriceControl = this.productForm.get('discountedPrice') as AbstractControl;

    const price = priceControl.value;
    const discount = discountControl.value;

    if (price !== null && discount !== null) {
      const discountedPrice = price - (price * discount / 100);
      discountedPriceControl.setValue(discountedPrice.toFixed(2));
    }
  }

  get sizes() {
    return this.productForm.get('sizes') as FormArray;
  }

  addSizeField(size:string) {
    if (size.trim() !== '') {
    this.sizes.push(this.formBuilder.control(size));
    }
  }

  addColourField2(colour: string): void {
    const position = this.colours.length + 1; // Position est l'index actuel + 1
    // const colourGroup = this.formBuilder.group({
    //   position: position.toString(),
    //   colour: colour
    // });

    // this.colours.push(colourGroup);
    const cl =this.formBuilder.control(colour)
    this.colours.push({ position: position, colour: cl });
  }

  removeSizeField(index: number) {
    this.sizes.removeAt(index);}

  onSubmit() {
  // const sizesControl = this.productForm.get('sizes');
  // const sizes = sizesControl ? (sizesControl.value as string[]) || [] : [];

 // const sizes = this.sizesFormArray.value as string[];
 const sizes = this.productForm.get('sizes')?.value as string[];

    this.addProductToFirestore(this.product);
  }


  onSelectFile(event?:any) {
    if (event.target.files && event.target.files.length > 0) {
      this.userFile = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(this.userFile);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }

  selectedFile: File | null = null;
  imageBase64: string | null = null;

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageBase64 = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }



  addProduct() {
    this.product.title= this.productForm.get('title')?.value;
    const formData = new FormData();
    formData.append('image', this.userFile);
    const poroductJson = JSON.stringify(this.product);
    const poroductJsonFile = new Blob([poroductJson], {
      type: 'application/json'
    });
    formData.append('product', poroductJsonFile);
    //console.log(this.product);

    this.productService.createProduct(formData).subscribe(
      (response) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors de la création du produit :', error);
        console.error('Réponse du serveur :', error.error);

        if (error.error && error.error.text) {
          console.error('Texte de la réponse :', error.error.text);
        }
      }
    );
  }

  addProductToFirestore(product:ProductDto) {
    this.product.title= this.productForm.get('title')?.value;
    this.product.description= this.productForm.get('description')?.value;
    this.product.quantity= this.productForm.get('quantity')?.value;
    this.product.discount= this.productForm.get('discount')?.value;
    this.product.price= this.productForm.get('price')?.value;
    this.product.size= this.productForm.get('sizes')?.value;
    this.product.colour= this.productForm.get('colours')?.value;    console.log(this.product.title)
    console.log(this.product);
    if (this.imageBase64 !== null) {
      this.product.coverImgUrl = this.imageBase64;
    }
    // const formData = new FormData();
    // formData.append('image', this.userFile);
    // const poroductJson = JSON.stringify(this.product);
    // const poroductJsonFile = new Blob([poroductJson], {
    //   type: 'application/json'
    // });
    // formData.append('product', poroductJsonFile);
    //console.log(this.product);

    this.productService.createProductToFirestore(this.product).subscribe(
      (response) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors de la création du produit :', error);
        console.error('Réponse du serveur :', error.error);

        if (error.error && error.error.text) {
          console.error('Texte de la réponse :', error.error.text);
        }
      }
    );
  }

  //colors
  get colours(): FormArray {
    return this.productForm.get('colours') as FormArray;
  }

  addColourField(colour: string): void {
    if (colour.trim() !== '') {
      const position = this.colours.length + 1; // Position est l'index actuel + 1
      const colourGroup = this.formBuilder.group({
        position: position.toString(),
        colour: colour
      });

      this.colours.push(colourGroup);
    }


  }

  removeColourField(index: number): void {
    this.colours.removeAt(index);
  }

  //images
  onSelectFileImgs(event?:any) {
    if (event.target.files && event.target.files.length > 0) {
      this.userFile = event.target.files[0];

    }
  }
}



export interface Category {
  id: number;
  name: string;
  subcategories: string[];
}
