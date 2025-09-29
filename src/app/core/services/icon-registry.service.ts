import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const icons = [
  'clock',
  'google_meet',
  'logo',
  'check_circle',
  'arrow',
  'vector',
];

@Injectable({
  providedIn: 'root',
})
export class IconRegistryService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  registerIcons(): void {
    icons.forEach(iconName => {
      this.matIconRegistry.addSvgIcon(
        iconName,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `/assets/icons/${iconName}.svg`
        )
      );
    });
  }
}
