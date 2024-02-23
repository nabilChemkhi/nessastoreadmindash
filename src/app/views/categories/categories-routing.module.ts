import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './Add categories/categories.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'categories',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'addcategory',
      },
      {
        path: 'addcategory',
        component: CategoriesComponent,
        data: {
          title: 'Add Category', 
        },
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}

