import { Component, OnInit } from '@angular/core';
import { CategoriesResponse } from '../../interfaces/categorias.interface';
import { CategoriesService } from '../../services/categories-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories-page',
  imports: [RouterLink],
  templateUrl: './categories-page.html',
  styleUrl: './categories-page.css',
})
export class CategoriesPage implements OnInit {

  categories:  CategoriesResponse = []
    
    constructor( private categoriasService: CategoriesService) {
      
    }
    
    loadCategories(){
      this.categoriasService.getCategorias().subscribe(resp => {
        this.categories = resp;
      })
    }

    ngOnInit(): void {
      this.loadCategories()
    }

    deleteCategory(id: number){
      this.categoriasService.deleteCategory(id).subscribe(() => {
        this.loadCategories();
      });
    }


}
