import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Room } from '../room';
import { RoomService } from '../room.service';
import { Alerta } from '../shared/alerta/alerta';
import { AlertaComponent } from '../shared/alerta/alerta.component';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  room: Room = new Room();
  submitted = false;

  constructor(private roomService: RoomService, public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
  }

  newRoom(): void {
    this.submitted = false;
    this.room = new Room();
  }

  save() {
    this.roomService.createRoom(this.room)
      .subscribe(() => {
        const config = {
          data: {
            btnSucesso: 'Back to Room List',
            btnCancelar: 'Add a new movie',
            corBtnCancelar: 'primary',
            possuirBtnFechar: true
          } as Alerta
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe((opcao: boolean) => {
          if (opcao) {
            this.gotoList();
          } else {
            this.newRoom();
          }
        });
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
        this.dialog.open(AlertaComponent, config);
      });
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/rooms']);
  }

}
