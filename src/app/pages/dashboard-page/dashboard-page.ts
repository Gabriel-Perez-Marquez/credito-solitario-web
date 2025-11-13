import { Component } from '@angular/core';

export interface Categories{
  id:number,
  nombre:String,
  ganancia: number
}


@Component({
  selector: 'app-dashboard-page',
  imports: [],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage {

  categories: Categories [] = [
    { id: 1, nombre: 'Comida', ganancia: 0 },
    { id: 2, nombre: 'Ropa', ganancia: 0 }
  ]

}
