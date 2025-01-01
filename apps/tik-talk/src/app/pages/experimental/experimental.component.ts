import { Component } from '@angular/core';
import { FormsExperimentComponent } from '../../experimental/forms-experiment/forms-experiment.component';

import { ChangeDetectionStrategy } from '@angular/core';

@Component({selector: 'app-experimental',
  standalone: true,
  imports: [FormsExperimentComponent],
  templateUrl: './experimental.component.html',
  styleUrl: './experimental.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperimentalComponent {}
