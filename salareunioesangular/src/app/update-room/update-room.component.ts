import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Room } from '../room';
import { RoomListComponent } from '../room-list/room-list.component';
import { RoomService } from '../room.service';
import { Alerta } from '../shared/alerta/alerta';
import { AlertaComponent } from '../shared/alerta/alerta.component';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.css']
})
export class UpdateRoomComponent implements OnInit {

  id!: number;
  room!: Room;
  submitted = false;

  roomsAqui!: Observable<Room[]>

  constructor(private route: ActivatedRoute,private router: Router, public dialog: MatDialog,
    private roomService: RoomService) { }

  ngOnInit() {
    this.room = new Room();

    this.id = this.route.snapshot.params['id'];
    
    this.roomService.getRoom(this.id)
      .subscribe(data => {
        console.log(data)
        this.room = data;
        
      }, error => console.log(error));
  }

  updateRoom() {
    this.roomService.updateRoom(this.id, this.room)
      .subscribe(() => {
        const config = {
          data: {
            btnSucesso: 'Back to Room List',
          } as Alerta
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe((opcao: boolean) => {
          if (opcao) {
            this.gotoList();
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
    this.updateRoom();    
  }

  gotoList() {
    this.router.navigate(['/rooms']);
  }

}
