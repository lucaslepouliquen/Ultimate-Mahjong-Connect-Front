import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-share-dialog',
  imports: [CommonModule, MatDialogModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './share-dialog.component.html',
  styleUrl: './share-dialog.component.css'
})
export class ShareDialogComponent {
  isCopied: boolean = false;

  constructor(
    private logger: LoggerService
  ) {}

  share(method:string) {
    var url = window.location.href;

    switch(method) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'messenger':
        window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=YOUR_APP_ID`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'threads':
        // Implements Threads sharing logic
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        this.copyToClipboard();
        break;
      default:
        this.logger.error('Invalid sharing method');
    }
  }

  copyToClipboard(): boolean{
    navigator.clipboard.writeText(window.location.origin + window.location.pathname)
      .then(() => {
        this.logger.log('Texte copié!');
        this.isCopied = true;
        setTimeout(() => this.isCopied = false, 2000);
      })
      .catch(err => {
        this.logger.error('Erreur lors de la copie: ', err);
      });
    this.isCopied = true
    return true
  }
}
