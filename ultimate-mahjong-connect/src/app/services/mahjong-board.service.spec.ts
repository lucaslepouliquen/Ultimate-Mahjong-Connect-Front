import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MahjongBoardService } from './mahjong-board.service';
import { HttpErrorService } from '@utilities/http-error.service';
import { mockMahjongBoard } from './mock-mahjong-board.service';

describe('MahjongBoardService', () => {
  let service: MahjongBoardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MahjongBoardService, 
        HttpErrorService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(MahjongBoardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize a deterministic board', () => {
    const mockBoard = [
      [{ category: 0, value: 1, isRemoved: false, isMatched: false, displayText: 'Test' }],
      [{ category: 1, value: 2, isRemoved: true, isMatched: false, displayText: 'Test2' }]
    ];

    service.initializeDeterministic().subscribe(response => {
      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.error).toBeUndefined();
    });

    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('GET');
    req.flush(mockBoard);
  });

  it('should initialize a random board', () => {
    const mockBoard = [
      [{ category: 0, value: 1, isRemoved: false, isMatched: false, displayText: 'Random' }]
    ];

    service.initializeRandom().subscribe(response => {
      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.error).toBeUndefined();
    });

    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('GET');
    req.flush(mockBoard);
  });

  it('should validate tile path', () => {
    const mockPath = { isValid: true, path: [] };

    service.validateTilePath(0, 0, 1, 1).subscribe(response => {
      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.error).toBeUndefined();
    });

    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('GET');
    expect(req.request.url).toContain('/path');
    expect(req.request.url).toContain('row1=0');
    expect(req.request.url).toContain('column1=0');
    expect(req.request.url).toContain('row2=1');
    expect(req.request.url).toContain('column2=1');
    req.flush(mockPath);
  });

  afterEach(() => {
    httpMock.verify();
  });
});