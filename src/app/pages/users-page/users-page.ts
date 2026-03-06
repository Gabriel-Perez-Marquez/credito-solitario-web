import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes-service';
import { Cliente, ClienteResponse } from '../../interfaces/clientes-response';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-page',
  imports: [RouterLink],
  templateUrl: './users-page.html',
  styleUrl: './users-page.css',
})
export class UsersPage implements OnInit {

  clientes: ClienteResponse = []; 
  clientToDelete: Cliente | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  messageTimeout: any = null;

  constructor(private clienteService: ClientesService) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(resp => {
      this.clientes = resp
    });
  }

  prepareDelete(cliente: Cliente) {
    this.clientToDelete = cliente;
  }

  confirmDelete() {
    if (!this.clientToDelete) return;
    
    this.errorMessage = null; 

    this.clienteService.deleteClient(this.clientToDelete.id).subscribe({
      next: () => {
        if (this.clientToDelete) {
          this.showTemporaryMessage(`Cliente "${this.clientToDelete.nombre}" y su cuenta de usuario han sido eliminados.`, 'success');
        }
        this.clientToDelete = null;
        
        this.clienteService.getClientes().subscribe(resp => {
          this.clientes = resp;
        });
      },
      error: (err) => {
        this.clientToDelete = null;
        this.errorMessage = 'No se pudo eliminar el cliente. Es posible que tenga pedidos vinculados en el sistema.';
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


  
}
