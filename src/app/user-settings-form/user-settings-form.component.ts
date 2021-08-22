import { Component, NgModule, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { UserSettings } from '../data/user-settings';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {
  originalUserSettings: UserSettings={
    name: "",
    emailOffers: false,
    interfaceStyle: "",
    subscriptionType: "",
    notes: ""
  };

  userSettings: UserSettings = { ...this.originalUserSettings};
  postError=false;
  postErrorMessage='';
  subscriptionTypes: Observable<string[]> | undefined;
  singleModel = "On";
  startDate: Date | undefined;
  startTime: Date | undefined;
  userRating= 0
  maxRating=10;
  isReadonly=false;


  constructor(private dataService: DataService) {

   }

  ngOnInit(): void {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
    this.startDate = new Date();
  }

  onSubmit(form: NgForm){
    console.log('In onsubmut: ', form.valid);
    if(form.valid){
      
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        result => console.log('Successful submit', result),
        error => this.onHttpError(error)
      );
    }else{
      this.postError=true;
      this.postErrorMessage="Please fix the above errors!"  
    }

  }

  onBlur(field: NgModel){
    console.log('In onblur :', field.valid);
  }

  onHttpError(errorResponse: any){
    console.log('Error onhttperror :', errorResponse);
    this.postError=true;
    this.postErrorMessage=errorResponse.error.errorMessage;
  }
  
}

