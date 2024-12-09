import { Component } from '@angular/core';
import { FormsExperimentComponent } from "../../experimental/forms-experiment/forms-experiment.component";

@Component({
  selector: 'app-experimental',
  standalone: true,
  imports: [FormsExperimentComponent],
  templateUrl: './experimental.component.html',
  styleUrl: './experimental.component.scss'
})
export class ExperimentalComponent {

}
