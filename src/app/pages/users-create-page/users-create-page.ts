import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClientesService } from '../../services/clientes-service';
import { Cliente } from '../../interfaces/clientes-response';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DireccionesService } from '../../services/direcciones-service';

@Component({
  selector: 'app-users-create-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './users-create-page.html',
  styleUrl: './users-create-page.css',
})
export class UsersCreatePage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientesService: ClientesService,
    private direccionesService: DireccionesService
  ) {}

  errors: string[] = [];
  isSaving = false;
  clientId = 0;
  cliente: Cliente | null = null;
  currentDireccionId: number | null = null;

  createForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
    password_confirmation: new FormControl(''),
    telefono: new FormControl('', Validators.required),
    saldo: new FormControl(0, [Validators.required, Validators.min(0)]),
    dni: new FormControl('', Validators.required),
    municipio: new FormControl('', Validators.required),
    calle: new FormControl('', Validators.required),
    numCasa: new FormControl('', Validators.required),
    provincia: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.clientId = +id;
    this.clientesService.getClient(this.clientId).subscribe((resp) => {
      this.cliente = resp;
      this.currentDireccionId = this.cliente.direccion_id;

      this.createForm.patchValue({
        nombre: this.cliente.nombre?.toString() ?? '',
        apellidos: this.cliente.apellidos?.toString() ?? '',
        telefono: this.cliente.telefono?.toString() ?? '',
        email: this.cliente.email?.toString() ?? '',
        dni: this.cliente.dni?.toString() ?? '',
        saldo: this.cliente.saldo,
        municipio: this.cliente.direccion?.municipio?.toString() ?? '',
        calle: this.cliente.direccion?.calle?.toString() ?? '',
        numCasa: this.cliente.direccion?.numCasa?.toString() ?? '',
        provincia: this.cliente.direccion?.provincia?.toString() ?? '',
      });
    });
  }

  validateForm() {
    this.errors = [];

    if (!this.clientId) {
      this.createForm.get('password')?.addValidators(Validators.required);
      this.createForm.get('password_confirmation')?.addValidators(Validators.required);
      this.createForm.get('password')?.updateValueAndValidity({ emitEvent: false });
      this.createForm.get('password_confirmation')?.updateValueAndValidity({ emitEvent: false });
    }

    if (this.createForm.invalid) {
      if (this.createForm.get('nombre')?.hasError('required')) this.errors.push('El nombre es obligatorio');
      if (this.createForm.get('apellidos')?.hasError('required')) this.errors.push('Los apellidos son obligatorios');
      if (this.createForm.get('email')?.hasError('required')) this.errors.push('El email es obligatorio');
      if (this.createForm.get('email')?.hasError('email')) this.errors.push('El formato del email no es valido');
      if (this.createForm.get('password')?.hasError('required')) this.errors.push('La contrasena es obligatoria');
      if (this.createForm.get('password_confirmation')?.hasError('required')) this.errors.push('La confirmacion de contrasena es obligatoria');
      if (this.createForm.get('dni')?.hasError('required')) this.errors.push('El DNI es obligatorio');
      if (this.createForm.get('municipio')?.hasError('required')) this.errors.push('El municipio es obligatorio');
      if (this.createForm.get('calle')?.hasError('required')) this.errors.push('La calle es obligatoria');
      if (this.createForm.get('numCasa')?.hasError('required')) this.errors.push('El numero de casa es obligatorio');
      if (this.createForm.get('provincia')?.hasError('required')) this.errors.push('La provincia es obligatoria');
      return;
    }

    const password = this.createForm.value.password ?? '';
    const passwordConfirmation = this.createForm.value.password_confirmation ?? '';

    if (!this.clientId && password !== passwordConfirmation) {
      this.errors.push('La contrasena y su confirmacion no coinciden');
      return;
    }

    this.saveClient();
  }

  saveClient() {
    this.isSaving = true;

    const nombre = this.createForm.value.nombre ?? '';
    const apellidos = this.createForm.value.apellidos ?? '';
    const email = this.createForm.value.email ?? '';
    const password = this.createForm.value.password ?? '';
    const password_confirmation = this.createForm.value.password_confirmation ?? '';
    const telefono = this.createForm.value.telefono ?? '';
    const saldo = Number(this.createForm.value.saldo ?? 0);
    const dni = this.createForm.value.dni ?? '';
    const municipio = this.createForm.value.municipio ?? '';
    const calle = this.createForm.value.calle ?? '';
    const numCasa = this.createForm.value.numCasa ?? '';
    const provincia = this.createForm.value.provincia ?? '';

    if (this.clientId) {
      const activo = this.cliente?.activo ?? true;
      if (!this.currentDireccionId) {
        this.errors = ['No se pudo actualizar: falta direccion_id del cliente.'];
        this.isSaving = false;
        return;
      }

      this.direccionesService
        .editDireccion(this.currentDireccionId, {
          municipio,
          calle,
          numCasa,
          provincia,
        })
        .subscribe({
          next: () => {
            this.clientesService
              .editClient(this.clientId, nombre, apellidos, telefono, email, dni, saldo, activo, this.currentDireccionId!)
              .subscribe({
                next: () => this.navigateToClients(),
                error: () => {
                  this.errors = ['No se pudo guardar el cliente. Revisa los datos e intentalo de nuevo.'];
                  this.isSaving = false;
                },
              });
          },
          error: () => {
            this.errors = ['No se pudo actualizar la direccion del cliente. Revisa los datos e intentalo de nuevo.'];
            this.isSaving = false;
          },
        });
      return;
    }

    this.clientesService
      .createClient({
        name: nombre,
        apellidos,
        email,
        password,
        password_confirmation,
        telefono,
        saldo,
        dni,
        municipio,
        calle,
        numCasa,
        provincia,
      })
      .subscribe({
        next: (resp) => {
          this.cliente = resp;
          this.navigateToClients();
        },
        error: () => {
          this.errors = ['No se pudo crear el cliente. Revisa los datos e intentalo de nuevo.'];
          this.isSaving = false;
        },
      });
  }

  navigateToClients() {
    this.router.navigateByUrl('/clients');
  }
}
