import { Component } from '@angular/core';
import { DataServiceService, Restaurants } from '../services/DataService/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  Restaurants:Restaurants[]=[];
  search:Restaurants[]=[];
  resName:string="";
  resType:string="";
  resDistance:number=0;
  resRating:number=0;
  resPrice:number=0;
  resTime:number=0;
  text:string="";

  constructor(private router:Router ,private DS:DataServiceService) {
    this.Restaurants = this.DS.RestaurantGET();
    this.search = this.Restaurants;
  }

  ADDCart(Restaurants:Restaurants) {
    this.DS.CartADD(Restaurants);
    this.router.navigate(['/tabs/tab3']);
    alert('yipeee');
  }

  TheSearch(): void {
    this.search = this.Restaurants.filter(
      (resItem) =>
        resItem.RName.toLowerCase().includes(this.text.toLowerCase()) ||
        resItem.RType.toLowerCase().includes(this.text.toLowerCase()) ||
        resItem.RRating == Number(this.text) ||
        resItem.RDistance == Number(this.text) ||
        resItem.RPrice == Number(this.text) ||
        resItem.RTime == Number(this.text)
    );

    if (this.resType !== '') {
      this.search = this.search.filter(
        (resItem) => resItem.RType.toLowerCase() === this.resType.toLowerCase()
      );
    }

    if (this.resRating > 0) {
      this.search = this.search.filter(
        (resItem) => resItem.RRating === this.resRating
      );
    }
  }

}
