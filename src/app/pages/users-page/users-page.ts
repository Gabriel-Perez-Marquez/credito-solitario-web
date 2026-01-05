import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes-service';
import { ClienteResponse } from '../../interfaces/clientes-response';

@Component({
  selector: 'app-users-page',
  imports: [],
  templateUrl: './users-page.html',
  styleUrl: './users-page.css',
})
export class UsersPage implements OnInit {

  clientes: ClienteResponse = []; 

  constructor(private clienteService: ClientesService) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(resp => {
      this.clientes = resp
    });
  }


  
}
