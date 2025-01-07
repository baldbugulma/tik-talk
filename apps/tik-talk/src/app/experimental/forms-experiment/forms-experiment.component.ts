import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';

function customFromEvent(el: HTMLElement, eventName: string) {
  return new Observable((subscriber) => {
    const handleEvent = (event: Event) => {
      subscriber.next(event);
    };
    el.addEventListener(eventName, handleEvent);
  });
}

function customTimer(time: number) {
  return new Observable((subscriber) => {
    let i = 0;
    setInterval(() => {
      subscriber.next(i++);
      console.log('INSIDE INTERVAL');
    }, time);

    return () => {
      console.log('DESTROYING');
    };
  });
}

@Component({
  selector: 'app-forms-experiment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forms-experiment.component.html',
  styleUrl: './forms-experiment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsExperimentComponent {
  constructor() {
    // const obs = new Observable((subscriber) => {
    //   subscriber.next(1);
    // });
    //
    // obs.subscribe((val) => console.log(val));

    customFromEvent(document.body, 'click')
      .pipe(map((res) => 'Че за х' + res))
      .subscribe((result) => {
        console.log(result);
      });

    customTimer(1000).subscribe((result) => {
      console.log(result);
    });
  }
}
