import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from './components/mahjong-board/mahjong-board.component';
import { MahjongToolbarComponent } from './components/mahjong-toolbar/mahjong-toolbar.component';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LoggerService } from './services/logger.service';

@Component({
  selector: 'app-root',
  imports: [BoardComponent, MahjongToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  title = 'Ultimate Mahjong Connect';
  constructor(
    private dialog: MatDialog,
    private logger: LoggerService
  ) {}

  onMenuClick(): void {
    this.logger.log('Menu clicked');
  }

  onFavoriteClick(): void {
    this.logger.log('Favorite clicked');
  }

  openShareDialog(): void {
    this.dialog.open(ShareDialogComponent, {
      width: '500px',
      panelClass: 'share-dialog-container'
    });
  }
}
