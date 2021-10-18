import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Goal } from '../goal';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GoalService } from '../goal-service/goal.service';

@Component({
  selector: 'app-goal-detail',
  templateUrl: './goal-detail.component.html',
  styleUrls: ['./goal-detail.component.css']
})
export class GoalDetailComponent implements OnInit {

  

  @Input() goal!: Goal;
  @Output() isComplete = new EventEmitter<boolean>();
  
  goalDelete(complete:boolean){
    this.isComplete.emit(complete)
  }

  goalComplete(complete:boolean){
    this.isComplete.emit(complete);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
