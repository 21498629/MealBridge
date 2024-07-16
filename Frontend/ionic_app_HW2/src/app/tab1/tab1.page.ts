import { Component } from '@angular/core';
import { DataServiceService, Restaurants } from '../services/DataService/data-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page 
{
 Restaurants:Restaurants[]=[];
  constructor(private DS:DataServiceService,private router:Router) {}

ngOnInit()
{
  this.Restaurants=this.DS.RestaurantGET();
  console.log(this.Restaurants);
}
ADDCart(Restaurants:Restaurants)
{
  this.DS.CartADD(Restaurants);
  this.router.navigate(['/tabs/tab3']);
  
  alert('yipeee');
}


}