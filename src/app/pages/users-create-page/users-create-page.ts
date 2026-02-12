import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClientesService } from '../../services/clientes-service';
import { Cliente, Direccion } from '../../interfaces/clientes-response';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DireccionesService } from '../../services/direcciones-service';

@Component({
  selector: 'app-users-create-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './users-create-page.html',
  styleUrl: './users-create-page.css',
})
export class UsersCreatePage implements OnInit {
  
  constructor(private route: ActivatedRoute, private router: Router, private clientesService: ClientesService, private direccionesService: DireccionesService) {}
  
  errors: string[] = [];
  isSaving = false;
  clientId: number = 0;
  cliente: Cliente | null = null;
  direcciones: Direccion [] = []

  createForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    dni: new FormControl('', Validators.required),
    saldo: new FormControl(0, [Validators.required, Validators.min(0)]),
    activo: new FormControl(true),
    direccion_id: new FormControl<number | null>(null, Validators.required)
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.clientId = +id;
      
      this.clientesService.getClient(this.clientId).subscribe(resp => {
          this.cliente = resp;
          if (this.cliente) {
            this.createForm.patchValue({
              nombre: this.cliente.nombre.toString(),
              apellidos: this.cliente.apellidos.toString(),
              telefono: this.cliente.telefono.toString(),
              email: this.cliente.email.toString(),
              dni: this.cliente.dni.toString(),
              saldo: this.cliente.saldo,
              activo: this.cliente.activo,
              direccion_id: this.cliente.direccion_id
            });
          }
        })
    }

    this.direccionesService.getDirecciones().subscribe(resp => {
      this.direcciones = resp
    })
    
  }



  validateForm() {
    this.errors = [];
    
    if (this.createForm.invalid) {
      if (this.createForm.get('nombre')?.hasError('required')) this.errors.push('El nombre es obligatorio');
      if (this.createForm.get('apellidos')?.hasError('required')) this.errors.push('Los apellidos son obligatorios');
      if (this.createForm.get('email')?.hasError('required')) this.errors.push('El email es obligatorio');
      if (this.createForm.get('email')?.hasError('email')) this.errors.push('El formato del email no es válido');
      if (this.createForm.get('dni')?.hasError('required')) this.errors.push('El DNI es obligatorio');
      if (this.createForm.get('direccion_id')?.hasError('required')) this.errors.push('Debes asignar una dirección ID');
    } else {
      this.saveClient();
    }
  }

  saveClient() {
    this.isSaving = true;
    const nombre = this.createForm.value.nombre ?? '';
    const apellidos = this.createForm.value.apellidos ?? '';
    const telefono = this.createForm.value.telefono ?? '';
    const email = this.createForm.value.email ?? '';
    const dni = this.createForm.value.dni ?? '';
    const saldo = this.createForm.value.saldo ?? 0;
    const activo = this.createForm.value.activo ?? true;
    const direccion_id = this.createForm.value.direccion_id ?? 0;

    if (this.clientId) {
      this.clientesService.editClient(this.clientId, nombre, apellidos, telefono, email, dni, saldo, activo, direccion_id)
        .subscribe({
          next: () => this.navigateToClients(),
          error: () => {
            this.errors = ['No se pudo guardar el cliente. Revisa los datos e intentalo de nuevo.'];
            this.isSaving = false;
          }
        });
      
    } else {
      this.clientesService.createClient(nombre, apellidos, telefono, email, dni, saldo, activo, direccion_id)
        .subscribe({
          next: (resp) => {
            this.cliente = resp;
            this.navigateToClients();
          },
          error: () => {
            this.errors = ['No se pudo crear el cliente. Revisa los datos e intentalo de nuevo.'];
            this.isSaving = false;
          }
        });
    }
  }

  navigateToClients() {
    this.router.navigateByUrl('/clients'); 
  }


}
