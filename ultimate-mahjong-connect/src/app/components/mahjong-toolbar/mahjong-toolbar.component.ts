import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mahjong-toolbar',
  imports: [CommonModule, MatIconModule, MatToolbarModule, MatButtonModule, MatMenuModule, MatDividerModule],
  templateUrl: './mahjong-toolbar.component.html',
  styleUrl: './mahjong-toolbar.component.css',
  standalone: true,
})
export class MahjongToolbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  @Input() title: string = '';
  
  @Output() menuClicked = new EventEmitter<void>();
  @Output() favoriteClicked = new EventEmitter<void>();
  @Output() shareClicked = new EventEmitter<void>();

  currentUser$ = this.authService.currentUser$;

  onMenuClick(): void {
    this.menuClicked.emit();
  }

  onFavoriteClick(): void {
    this.favoriteClicked.emit();
  }

  onShareClick(): void {
    this.shareClicked.emit();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
} 