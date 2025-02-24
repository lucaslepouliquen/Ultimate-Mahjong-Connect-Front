import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MahjongTileComponent } from './mahjong-tile.component';

describe('MahjongTileComponent', () => {
  let component: MahjongTileComponent;
  let fixture: ComponentFixture<MahjongTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MahjongTileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MahjongTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
