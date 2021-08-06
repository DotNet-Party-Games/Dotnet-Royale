import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PartygameService } from './partygame.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _partyGameService:PartygameService, private _router:Router){}
  canActivate(): boolean{
    if (this._partyGameService.loggedIn()){
      return true;
    }else{
      this._router.navigate(['/Login']);
      return false;
    }
  }
  
}
