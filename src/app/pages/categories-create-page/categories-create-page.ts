import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories-service';
import { Categoria } from '../../interfaces/categorias.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categories-create-page',
  imports: [ReactiveFormsModule],
  templateUrl: './categories-create-page.html',
  styleUrl: './categories-create-page.css',
})
export class CategoriesCreatePage implements OnInit{


  constructor(private route:ActivatedRoute, private router: Router, private categoriaService: CategoriesService) {
    
  }



  
  errors: string[] = [];
  
  categoria: Categoria | null = null

  categoryId: number = 0
  
  createForm = new FormGroup({
    formControlName: new FormControl('', Validators.required),
    formControlActiva: new FormControl(true, Validators.required)
  });
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      this.categoryId = +id
      
      this.categoriaService.getCategory(+id).subscribe(resp => {
        this.categoria = resp
        if(this.categoria){
        this.createForm.patchValue({
          formControlName: this.categoria.nombre.toString(),
          formControlActiva: this.categoria.activa
        });
      }
      })
    }
    
    
  }
  validateForm(){
    this.errors = [];
    if (!this.createForm.valid) {
      if (this.createForm.get('formControlName')?.hasError('required')) {
        this.errors.push('El nombre es obligatorio');
      }
      if (this.createForm.get('formControlActiva')?.hasError('required')) {
        this.errors.push('Es obligatorio poner si esta activa o no');
      }
    } else {
      this.saveCategory()
    }

  }

  saveCategory(){
    const nombre = this.createForm.value.formControlName ?? '';
    const activa = this.createForm.value.formControlActiva ?? true;

    if(this.categoryId){
      this.categoriaService.editCategory(this.categoryId, nombre, activa).subscribe();
    }else {
      this.categoriaService.createCategory(nombre, activa).subscribe(resp => {
        this.categoria = resp
      });
    }

    this.navigateToCategories()

    
  }

  navigateToCategories() {
    this.router.navigateByUrl('/categories'); 
  }

}
