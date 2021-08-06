import { Component, OnInit, ɵmarkDirty as markDirty, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { fromEvent, Subject, interval, BehaviorSubject, merge } from 'rxjs';
import { takeUntil, tap, switchMap, filter, distinctUntilChanged } from 'rxjs/operators';

const TICK_INTERVAL = 150;

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnakeComponent implements OnInit {

  @HostBinding('class.game-container') gameContainerClass = true;


  constructor() { }

  ngOnInit(): void {
  }

}
