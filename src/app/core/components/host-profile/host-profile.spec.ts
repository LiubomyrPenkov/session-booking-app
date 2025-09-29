import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostProfile } from './host-profile';
import type { SessionHost } from '../../types';

describe('HostProfile', () => {
  let component: HostProfile;
  let fixture: ComponentFixture<HostProfile>;

  const mockHost: SessionHost = {
    photo: 'https://example.com/photo.jpg',
    firstName: 'John',
    lastName: 'Doe',
    profession: 'Software Engineer',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostProfile],
    }).compileComponents();

    fixture = TestBed.createComponent(HostProfile);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('hostFullName computed', () => {
    it('should return empty string when no host is provided', () => {
      expect(component.hostFullName()).toBe('');
    });

    it('should return full name when host is provided', () => {
      fixture.componentRef.setInput('host', mockHost);
      fixture.detectChanges();

      expect(component.hostFullName()).toBe('John Doe');
    });

    it('should handle host with empty first name', () => {
      const hostWithoutFirstName = { ...mockHost, firstName: '' };
      fixture.componentRef.setInput('host', hostWithoutFirstName);
      fixture.detectChanges();

      expect(component.hostFullName()).toBe('Doe');
    });

    it('should handle host with empty last name', () => {
      const hostWithoutLastName = { ...mockHost, lastName: '' };
      fixture.componentRef.setInput('host', hostWithoutLastName);
      fixture.detectChanges();

      expect(component.hostFullName()).toBe('John');
    });
  });

  describe('layout input', () => {
    it('should default to horizontal layout', () => {
      expect(component.layout()).toBe('horizontal');
    });

    it('should accept vertical layout', () => {
      fixture.componentRef.setInput('layout', 'vertical');
      fixture.detectChanges();

      expect(component.layout()).toBe('vertical');
    });

    it('should accept horizontal layout explicitly', () => {
      fixture.componentRef.setInput('layout', 'horizontal');
      fixture.detectChanges();

      expect(component.layout()).toBe('horizontal');
    });
  });

  describe('host input', () => {
    it('should start with undefined host', () => {
      expect(component.host()).toBeUndefined();
    });

    it('should accept host data', () => {
      fixture.componentRef.setInput('host', mockHost);
      fixture.detectChanges();

      expect(component.host()).toEqual(mockHost);
    });
  });
});
