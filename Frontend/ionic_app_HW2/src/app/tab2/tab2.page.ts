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
  resArea:string="";
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
        resItem.RArea.toLowerCase().includes(this.text.toLowerCase()) ||
        resItem.RDistance == Number(this.text) 
       
    );

    if (this.resArea !== '') {
      this.search = this.search.filter(
        (resItem) => resItem.RArea.toLowerCase() === this.resArea.toLowerCase()
      );
    }

    if (this.resRating > 0) {
      this.search = this.search.filter(
        (resItem) => resItem.RDistance === this.resRating
      );
    }
  }

}
