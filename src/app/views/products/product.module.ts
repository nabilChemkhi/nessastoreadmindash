import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddProductComponent} from "./add-product/add-product.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductRoutingModule} from "./product-routing.module";
import {
  AccordionModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  CardModule, CarouselModule,
  CollapseModule, DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule, NavModule, PaginationModule,
  PlaceholderModule, PopoverModule,
  ProgressModule,
  SharedModule,
  SpinnerModule, TableModule, TabsModule, TooltipModule,
  UtilitiesModule
} from "@coreui/angular";
import {BaseRoutingModule} from "../users/user-routing.module";
import {IconModule} from "@coreui/icons-angular";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { NgSelectModule } from '@ng-select/ng-select';
import { AppModule } from 'src/app/app.module';



@NgModule({
  declarations: [AddProductComponent],
  imports: [
    NgSelectModule,
    ProductRoutingModule,
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



  ]
})
export class ProductModule { }
