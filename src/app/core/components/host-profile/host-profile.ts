import { Component, input, computed } from '@angular/core';

import type { SessionHost } from '../../types';

type HostProfileLayout = 'vertical' | 'horizontal';

@Component({
  selector: 'app-host-profile',
  templateUrl: './host-profile.html',
  styleUrl: './host-profile.scss',
})
export class HostProfile {
  host = input<SessionHost>();
  layout = input<HostProfileLayout>('horizontal');

  hostFullName = computed(() => {
    const hostData = this.host();
    if (!hostData) {
      return '';
    }

    return `${hostData.firstName} ${hostData.lastName}`.trim();
  });
}
