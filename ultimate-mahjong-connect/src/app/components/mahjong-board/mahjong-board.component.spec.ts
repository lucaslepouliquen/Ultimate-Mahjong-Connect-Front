import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardComponent } from './mahjong-board.component';
import { MahjongBoardService } from 'src/app/services/mahjong-board.service';
import { provideHttpClient } from '@angular/common/http';
import { lastValueFrom, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MahjongTileComponent } from '../mahjong-tile/mahjong-tile.component';
import { CommonModule } from '@angular/common';
import { MahjongBoardServiceMock } from './mahjong-board-mock-service';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let service: MahjongBoardService;
  let mockService: MahjongBoardServiceMock;

  beforeEach(async () => {
    mockService = new MahjongBoardServiceMock();

    await TestBed.configureTestingModule({
      imports: [
        BoardComponent,
        MahjongTileComponent,
        CommonModule
      ],
      providers:[
        {provide: MahjongBoardService, useValue: mockService},
        provideHttpClient(),
      ]
    })
    .compileComponents();

    spyOn(mockService, 'initializeDeterministic').and.returnValue(
      of(mockService['mockBoardData'])
    );
    
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add tile to selectedTiles', () => {
    component.selectTile(1, 1);
    expect(component.selectedTiles.length).toBe(1);
    expect(component.selectedTiles[0].row).toBe(1);
    expect(component.selectedTiles[0].column).toBe(1);

    component.selectTile(1, 2);
    expect(component.selectedTiles.length).toBe(0);
  });
});
