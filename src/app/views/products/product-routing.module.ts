import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddProductComponent} from "./add-product/add-product.component";


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'products',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'addProduct',
      },
      {
        path: 'addProduct',
        component: AddProductComponent,
        data: {
          title: 'Add Product',
        },
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}

