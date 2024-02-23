import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignUpAllUserComponent } from './All users/signUpAllUser.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'users',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'registeAllUser',
      },
      {
        path: 'registeAllUser',
        component: SignUpAllUserComponent ,
        data: {
          title: 'Register',
        },
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}

