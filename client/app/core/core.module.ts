import { NgModule } from "@angular/core"
import { CommonModule } from '@angular/common'

import { SharedModule } from "../shared/shared.module"

import { RoutingModule } from "./core.routing"

import { HomeComponent } from "./home/home.component"

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RoutingModule
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ]
})

export class CoreModule {}