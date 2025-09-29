import { TestBed } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { IconRegistryService } from './icon-registry.service';

describe('IconRegistryService', () => {
  let service: IconRegistryService;
  let mockMatIconRegistry: jasmine.SpyObj<MatIconRegistry>;
  let mockDomSanitizer: jasmine.SpyObj<DomSanitizer>;

  beforeEach(() => {
    const matIconRegistrySpy = jasmine.createSpyObj('MatIconRegistry', [
      'addSvgIcon',
    ]);
    const domSanitizerSpy = jasmine.createSpyObj('DomSanitizer', [
      'bypassSecurityTrustResourceUrl',
    ]);

    TestBed.configureTestingModule({
      providers: [
        IconRegistryService,
        { provide: MatIconRegistry, useValue: matIconRegistrySpy },
        { provide: DomSanitizer, useValue: domSanitizerSpy },
      ],
    });

    service = TestBed.inject(IconRegistryService);
    mockMatIconRegistry = TestBed.inject(
      MatIconRegistry
    ) as jasmine.SpyObj<MatIconRegistry>;
    mockDomSanitizer = TestBed.inject(
      DomSanitizer
    ) as jasmine.SpyObj<DomSanitizer>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register icons', () => {
    const mockSafeUrl = 'safe-url';
    mockDomSanitizer.bypassSecurityTrustResourceUrl.and.returnValue(
      mockSafeUrl as any
    );

    service.registerIcons();

    expect(mockMatIconRegistry.addSvgIcon).toHaveBeenCalled();
    expect(mockDomSanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalled();
  });

  it('should create correct asset paths for icons', () => {
    const mockSafeUrl = 'safe-url';
    mockDomSanitizer.bypassSecurityTrustResourceUrl.and.returnValue(
      mockSafeUrl as any
    );

    service.registerIcons();

    const sanitizerCalls =
      mockDomSanitizer.bypassSecurityTrustResourceUrl.calls.all();
    sanitizerCalls.forEach(call => {
      const path = call.args[0];
      expect(path).toMatch(/^\/assets\/icons\/\w+\.svg$/);
    });
  });

  it('should register each icon with sanitized URL', () => {
    const mockSafeUrl = 'safe-url';
    mockDomSanitizer.bypassSecurityTrustResourceUrl.and.returnValue(
      mockSafeUrl as any
    );

    service.registerIcons();

    const iconRegistryCalls = mockMatIconRegistry.addSvgIcon.calls.all();
    iconRegistryCalls.forEach(call => {
      expect(call.args[0]).toMatch(/^\w+$/); // icon name should be a word
      expect(call.args[1]).toBe(mockSafeUrl); // should use sanitized URL
    });
  });
});
