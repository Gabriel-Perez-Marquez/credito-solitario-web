import { Component, OnInit } from '@angular/core';
import { Categoria, CategoriesResponse } from '../../interfaces/categorias.interface';
import { CategoriesService } from '../../services/categories-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-categories-page',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './categories-page.html',
  styleUrl: './categories-page.css',
})
export class CategoriesPage implements OnInit {

    categories:  CategoriesResponse = []
    categoryToDelete: Categoria | null = null;
    errorMessage: string | null = null;
    successMessage: string | null = null;
    messageTimeout: any = null;
    
    constructor( private categoriasService: CategoriesService, private router: Router) {
      
    }
    
    loadCategories(){
      this.categoriasService.getCategorias().subscribe(resp => {
        this.categories = resp;
      })
    }

    ngOnInit(): void {
      this.loadCategories()
    }

    prepareDelete(categoria: Categoria) {
  this.categoryToDelete = categoria;
}

confirmDelete() {
    if (!this.categoryToDelete) return;
    
    this.errorMessage = null;

    this.categoriasService.deleteCategory(this.categoryToDelete.id).subscribe({
      next: () => {
        this.showTemporaryMessage(`Categoría "${this.categoryToDelete!.nombre}" eliminada.`, 'success');
        this.categoryToDelete = null;
        this.loadCategories();
      },
      error: (err) => {
        this.categoryToDelete = null;
        this.errorMessage = 'No se puede eliminar la categoría porque tiene productos vinculados.';
        this.showTemporaryMessage(null, 'error'); 
      }
    });
  }

  private showTemporaryMessage(msg: string | null, type: 'success' | 'error') {
    if (type === 'success') this.successMessage = msg;
    
    if (this.messageTimeout) clearTimeout(this.messageTimeout);
    
    this.messageTimeout = setTimeout(() => {
      this.successMessage = null;
      this.errorMessage = null;
    }, 5000); 
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    

    this.router.navigate(['/login']);
  }

}
