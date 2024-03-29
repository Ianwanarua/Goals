import { Component, OnInit } from '@angular/core';
import { Goal } from '../goal'
import { GoalService } from '../goal-service/goal.service';
import { AlertService } from '../alert-service/alert.service';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../quote-class/quote';
import { Router } from '@angular/router';
import { QuoteRequestService } from '../quote-http/quote-request.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {
  
  goals: Goal[];
  alertService: AlertService;
  quote!: Quote;

  goToUrl(id: any){
    this.router.navigate(['/goals',id])
  }
  

addNewGoal(goal: Goal){
  let goallength = this.goals.length;
  goal.id = goallength+1;
  goal.completeDate = new Date(goal.completeDate)
  this.goals.push(goal)
}

  // deleteGoal(isComplete: any, index: number){
  //   if (isComplete) {
  //     let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}?`)

  //     if (toDelete) {
  //       this.goals.splice(index,1)
  //       this.alertService.alertMe("The goal has beeen deleted")
  //     }
  //   }
  // }

  deleteGoal(index: any){
    let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}`)

    if (toDelete){
      this.goals.splice(index,1)
      this.alertService.alertMe("Goal has been deleted")
    }
  }

toggleDetails(index: any){
  this.goals[index].showDescription = !this.goals[index].showDescription;
}

completeGoal(isComplete: any, index: number){
  if (isComplete) {
    this.goals.splice(index,1);
  }
}


  constructor(goalService: GoalService, alertService: AlertService, private http: HttpClient,  private quoteService:QuoteRequestService, private router:Router) { 
    this.goals = goalService.getGoals()
    this.alertService= alertService;
  }

  ngOnInit(): void {
    interface ApiResponse{
      author:string;
      quote:string;
    }

    this.http.get<ApiResponse>("http://quotes.stormconsultancy.co.uk/random.json").subscribe(data=>{
      // Succesful API request
      this.quote = new Quote(data.author, data.quote)
    },err=>{
      this.quote = new Quote("Winston Churchill","Never never give up!")
      console.log("An error occurred")
  })

  }
}
