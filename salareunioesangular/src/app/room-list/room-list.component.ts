import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Room } from '../room';
import { RoomService } from '../room.service';
import { Alerta } from '../shared/alerta/alerta';
import { AlertadeleteComponent } from '../shared/alertadelete/alertadelete.component';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  rooms!: Observable<Room[]>

  constructor(private roomService: RoomService, public dialog: MatDialog,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.rooms = this.roomService.getRoomsList();
  }

  deleteRoom(id: number) {

      const config = {
        data: {
          btnSucesso: 'Confirm',
          btnCancelar: 'Back to Room List',
          corBtnCancelar: 'primary',
          possuirBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertadeleteComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
          this.roomService.deleteRoom(id)
          .subscribe(
            (        data: any) => {
              console.log(data);
              this.reloadData();
            },
            () => {
              const config = {
                data: {
                  titulo: 'Error!',
                  descricao: 'It was not possible save your register, please try again',
                  corBtnSucesso: 'warn',
                  btnSucesso: 'Close'
                } as Alerta
              };
              this.dialog.open(AlertadeleteComponent, config);
            })
        } 
      });
  }

  roomDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateRoom(id: number){
    this.router.navigate(['update', id]);
  }
}
