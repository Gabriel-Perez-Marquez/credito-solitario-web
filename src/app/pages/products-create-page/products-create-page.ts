import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto-service';
import { Producto } from '../../interfaces/producto.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../interfaces/categorias.interface';
import { CategoriesService } from '../../services/categories-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-create-page',
  imports: [ReactiveFormsModule],
  templateUrl: './products-create-page.html',
  styleUrl: './products-create-page.css',
})
export class ProductsCreatePage implements OnInit{


  constructor(private productoService: ProductoService, private categoriaService: CategoriesService, private route: ActivatedRoute, private router: Router) {}
  
  
  producto: Producto | null = null;
  categories: Categoria[] = [];
  errors: string[] = [];
  productoId: number = 0;
  
  createForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl(''),
    precio: new FormControl(0, [Validators.required, Validators.min(0)]),
    descuento: new FormControl(0, [Validators.min(0), Validators.max(100)]),
    stock: new FormControl(0, [Validators.required, Validators.min(0)]), 
    categoria_id: new FormControl<number | null>(null, Validators.required), 
    urlImagen: new FormControl(''), 
    activo: new FormControl(true)   
  });
  
  
  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      this.productoId = +id;
      this.productoService.getProducto(this.productoId).subscribe(resp => {
        this.producto = resp;
        console.log(this.producto);
        this.createForm.patchValue({
          nombre: this.producto.nombre,
          descripcion: this.producto.descripcion,
          categoria_id: this.producto.categoria_id,
          precio: +this.producto.precio,
          activo: this.producto.activo,
          descuento: +this.producto.descuento,
          stock: this.producto.stock,
          urlImagen: this.producto.urlImagen
        });
      });
    }

    this.categoriaService.getCategorias().subscribe(categorias => {
      this.categories = categorias;
    });
  }
  
  validateForm() {
    if (!this.createForm.valid) {
      this.errors = [];
      if (this.createForm.get('nombre')?.hasError('required')) {
        this.errors.push('El nombre es obligatorio');
      }
      if (this.createForm.get('descripcion')?.hasError('required')) {
        this.errors.push('La descripción es obligatoria');
      }
      if (this.createForm.get('categoria_id')?.hasError('required')) {
        this.errors.push('La categoría es obligatoria');
      }
      if (this.createForm.get('precio')?.hasError('required')) {
        this.errors.push('El precio es obligatorio');
      }
      if (this.createForm.get('descuento')?.hasError('min')) {
        this.errors.push('El descuento no puede ser negativo');
      }
      if (this.createForm.get('descuento')?.hasError('max')) {
        this.errors.push('El descuento no puede ser mayor a 100');
      }
      if (this.createForm.get('stock')?.hasError('required')) {
        this.errors.push('El stock es obligatorio');
      }
      if (this.createForm.get('urlImagen')?.hasError('required')) {
        this.errors.push('La imagen es obligatoria');
      }
      
    } else {
      this.createProducto();
      this.goToProductsPage();
    }
  }
      

  createProducto () {
    const nombre = this.createForm.value.nombre ?? '';
    const descripcion = this.createForm.value.descripcion ?? '';
    const categoria_id = this.createForm.value.categoria_id ?? 0;
    const precio = this.createForm.value.precio ?? 0;
    const activo = this.createForm.value.activo ?? true;
    const descuento = this.createForm.value.descuento ?? 0;
    const stock = this.createForm.value.stock ?? 0;
    const urlImagen = this.createForm.value.urlImagen ?? '';
    
    this.productoService.createProducto(nombre, descripcion, categoria_id, String(precio), activo, String(descuento), stock, urlImagen)
      .subscribe( resp => {
        this.producto = resp;
      });
  }

  goToProductsPage() {
    this.router.navigateByUrl('/products'); 
  }

}
