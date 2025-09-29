import { TestBed } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';

import { AppHeader } from '@core/components/app-header';
import { MockAppHeader } from '@testing/components';

import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, RouterOutlet],
    })
      .overrideComponent(App, {
        remove: { imports: [AppHeader] },
        add: { imports: [MockAppHeader] },
      })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render app container with header', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.app-container')).toBeTruthy();
    expect(compiled.querySelector('.app-header')).toBeTruthy();
  });
});
