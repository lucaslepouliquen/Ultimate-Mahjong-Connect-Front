import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/mahjong-board/mahjong-board.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpErrorService } from '@utilities/http-error.service';
import {provideHttpClient } from '@angular/common/http';
import { MahjongBoardService } from './services/mahjong-board.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        BoardComponent,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule
      ],
    providers: [
          MahjongBoardService, 
          HttpErrorService,
          provideHttpClient(),
        ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the Ultimate Mahjong Connect title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Ultimate Mahjong Connect');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Ultimate Mahjong Connect');
  });
});
