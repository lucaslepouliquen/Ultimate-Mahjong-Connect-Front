import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MahjongToolbarComponent } from './mahjong-toolbar.component';

describe('MahjongToolbarComponent', () => {
  let component: MahjongToolbarComponent;
  let fixture: ComponentFixture<MahjongToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MahjongToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MahjongToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit menuClicked when menu button is clicked', () => {
    spyOn(component.menuClicked, 'emit');
    component.onMenuClick();
    expect(component.menuClicked.emit).toHaveBeenCalled();
  });

  it('should emit favoriteClicked when favorite button is clicked', () => {
    spyOn(component.favoriteClicked, 'emit');
    component.onFavoriteClick();
    expect(component.favoriteClicked.emit).toHaveBeenCalled();
  });

  it('should emit shareClicked when share button is clicked', () => {
    spyOn(component.shareClicked, 'emit');
    component.onShareClick();
    expect(component.shareClicked.emit).toHaveBeenCalled();
  });
}); 