import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from './components/mahjong-board/mahjong-board.component';
import { MahjongToolbarComponent } from './components/mahjong-toolbar/mahjong-toolbar.component';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LoggerService } from './services/logger.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [BoardComponent, MahjongToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent implements OnInit {
  title = 'Ultimate Mahjong Connect';
  
  constructor(
    private dialog: MatDialog,
    private logger: LoggerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.ensureAnonymousSession();
  }

  /**
   * Ensure user has an anonymous session for playing
   */
  private ensureAnonymousSession(): void {
    // Check if user is already authenticated (JWT token)
    if (this.authService.hasToken()) {
      this.logger.log('✅ User has JWT token, ready to play');
      return;
    }

    // Check if user already has anonymous session
    if (this.authService.hasAnonymousSession()) {
      this.logger.log('✅ User has anonymous session, ready to play');
      return;
    }

    // Create anonymous session for immediate access
    this.logger.log('🎯 Creating anonymous session for immediate play...');
    this.authService.createAnonymousSession().subscribe({
      next: (session) => {
        this.logger.log('✅ Anonymous session created for play:', session.sessionId);
      },
      error: (error) => {
        this.logger.error('❌ Failed to create anonymous session:', error);
        // Continue anyway, the board will work without session
      }
    });
  }

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
