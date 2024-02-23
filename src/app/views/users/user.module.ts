import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {NgModel, ReactiveFormsModule} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// CoreUI Modules
import {
  AccordionModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  NavModule,
  PaginationModule,
  PlaceholderModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  SpinnerModule,
  TableModule,
  TabsModule,
  TooltipModule,
  UtilitiesModule
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// utils
import { FormsModule } from '@angular/forms';  // Import the FormsModule

// views
import { SignUpAllUserComponent } from './All users/signUpAllUser.component';


// Components Routing
import { BaseRoutingModule } from './user-routing.module';

@NgModule({
  imports: [


    CommonModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    BaseRoutingModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    GridModule,
    UtilitiesModule,
    SharedModule,
    ListGroupModule,
    IconModule,
    ListGroupModule,
    PlaceholderModule,
    ProgressModule,
    SpinnerModule,
    TabsModule,
    NavModule,
    TooltipModule,
    CarouselModule,
    DropdownModule,
    PaginationModule,
    PopoverModule,
    TableModule,
    FontAwesomeModule,


  ],
  declarations: [
    SignUpAllUserComponent
  ]
})
export class BaseModule {}
