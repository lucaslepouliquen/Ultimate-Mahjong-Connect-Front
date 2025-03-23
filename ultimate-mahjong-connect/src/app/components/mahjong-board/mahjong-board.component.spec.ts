import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardComponent } from './mahjong-board.component';
import { MahjongBoardService } from 'src/app/services/mahjong-board.service';
import { provideHttpClient } from '@angular/common/http';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardComponent],
      providers:[
        MahjongBoardService, 
        provideHttpClient(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
