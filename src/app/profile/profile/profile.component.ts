import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Chirp } from 'src/app/models/chirp';
import { ProfileService } from '../profile-service';
import * as fromAppReducer from '../../redux/reducers/app-reducer'
import * as fromEndpointsAction from '../../redux/actions/endpoints-action'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(private profileservice:ProfileService, private route:ActivatedRoute, private store:Store<fromAppReducer.AppState>) { }
  
  ngOnDestroy(): void {
    if (this.profileSubs){
      this.profileSubs.unsubscribe()
    }
  }

  ID:string
  Username:string
  Email:string
  AvatarURL:string
  Feed:Chirp[]
  Desc:string
  FollowerCount:string
  FollowingCount:string
  profileSubs:Subscription

  ngOnInit(): void {
    this.ID = this.route.snapshot.queryParamMap.get("ID")
    this.profileSubs = this.profileservice.getProfileInfo(this.ID).subscribe((data)=>{
      this.Username = data["Username"]
      this.Email = data["Email"]
      this.AvatarURL = data["AvatarURL"]
      this.Feed = data["Feed"]
      this.Desc = data["Desc"]
      this.FollowerCount = data["FollowerCount"]
      this.FollowingCount = data["FollowingCount"]
    })
  }

}
