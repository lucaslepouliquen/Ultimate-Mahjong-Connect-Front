import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from './components/mahjong-board/mahjong-board.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  imports: [BoardComponent,MatIconModule,MatToolbarModule,MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  title = 'ultimate-mahjong-connect';
  constructor(private dialog:MatDialog) {}

  openShareDialog(): void {
    this.dialog.open(ShareDialogComponent, {
      width: '500px',
      panelClass: 'share-dialog-container'
    });
  }
}
