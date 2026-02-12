import { Component, OnInit } from '@angular/core';
import { CategoriesResponse } from '../../interfaces/categorias.interface';
import { CategoriesService } from '../../services/categories-service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink],
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
