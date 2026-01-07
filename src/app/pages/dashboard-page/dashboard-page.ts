import { Component, OnInit } from '@angular/core';
import { CategoriesResponse } from '../../interfaces/categorias.interface';
import { CategoriesService } from '../../services/categories-service';


@Component({
  selector: 'app-dashboard-page',
  imports: [],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage implements OnInit{
  
  categories:  CategoriesResponse = []
  
  constructor( private categoriasService: CategoriesService) {
    
  }
  
  ngOnInit(): void {
    this.categoriasService.getCategorias().subscribe(resp => {
      this.categories = resp;
    })
  }

}
