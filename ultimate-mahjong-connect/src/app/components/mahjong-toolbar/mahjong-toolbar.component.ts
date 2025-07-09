import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-mahjong-toolbar',
  imports: [MatIconModule, MatToolbarModule, MatButtonModule],
  templateUrl: './mahjong-toolbar.component.html',
  styleUrl: './mahjong-toolbar.component.css',
  standalone: true,
})
export class MahjongToolbarComponent {
  @Input() title: string = '';
  
  @Output() menuClicked = new EventEmitter<void>();
  @Output() favoriteClicked = new EventEmitter<void>();
  @Output() shareClicked = new EventEmitter<void>();

  onMenuClick(): void {
    this.menuClicked.emit();
  }

  onFavoriteClick(): void {
    this.favoriteClicked.emit();
  }

  onShareClick(): void {
    this.shareClicked.emit();
  }
} 