import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../interfaces/categorias.interface';
import { ProductsService } from '../../services/products-service';
import { CategoriesService } from '../../services/categories-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../interfaces/product-interface';

@Component({
  selector: 'app-products-create-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './products-create-page.html',
  styleUrl: './products-create-page.css',
})
export class ProductsCreatePage implements OnInit{

  categories: Categoria[] = [];
  errors: string[] = [];
  isSaving = false;
  productId: number = 0;
  producto: Product | null = null

 
  productForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    urlImagen: new FormControl('', [Validators.required]),
    stock: new FormControl(0, [Validators.required, Validators.min(0)]),
    precio: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    categoria_id: new FormControl<number | null>(null, [Validators.required]),
    descripcion: new FormControl(''),
    enVenta: new FormControl(true)
  });

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCategories();


    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = +id;

      this.productsService.getProduct(+id).subscribe(resp => {
        this.producto = resp
        if(this.producto){
          this.productForm.patchValue({
            nombre: this.producto.nombre,
            urlImagen: this.producto.urlImagen,
            stock: this.producto.stock,
            precio: this.producto.precio,
            categoria_id: this.producto.categoria_id,
            descripcion: this.producto.descripcion,
            enVenta: this.producto.enVenta
          })
        }
      })
      
    }
  }

  loadCategories() {
    this.categoriesService.getCategorias().subscribe(resp => {
      this.categories = resp
    });
  }


  validateForm() {
    this.errors = [];

    if (!this.productForm.invalid) {
      this.saveProduct();
    } 
      
  }

  saveProduct(){
    this.isSaving = true;
    const productData = {
      id: this.productId,
      nombre: this.productForm.value.nombre || '',
      urlImagen: this.productForm.value.urlImagen || '',
      stock: this.productForm.value.stock || 0,
      precio: this.productForm.value.precio || 0,
      categoria_id: this.productForm.value.categoria_id!,
      descripcion: this.productForm.value.descripcion || '',
      enVenta: this.productForm.value.enVenta ?? true
    };

    if(this.productId){
      this.productsService.updateProduct(this.productId, productData).subscribe({
        next: () => this.navigateToProductos(),
        error: () => {
          this.errors = ['No se pudo guardar el producto.'];
          this.isSaving = false;
        }
      });
    } else {
      this.productsService.createProduct(productData).subscribe({
        next: (resp) => {
          this.producto = resp;
          this.navigateToProductos();
        },
        error: () => {
          this.errors = ['No se pudo crear el producto.'];
          this.isSaving = false;
        }
      });
    }
  }

  navigateToProductos(){
    this.router.navigate(['products'])
  }

}
