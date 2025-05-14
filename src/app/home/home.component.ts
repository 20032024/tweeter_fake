import { Component } from '@angular/core';
import { StorageService } from "../services/storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    username : String = "";
     
    constructor( private storageService : StorageService)
    { 
       this.username = this.storageService.getSession("user");
       console.log(this.username);
    }


}
