import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService,Restaurants } from '../services/DataService/data-service.service';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  PastOrders:{rName:string, rPrice:number;}[]=[];

  constructor(private router:Router, private DS:DataServiceService) { }

  ngOnInit():void
   {
    this.PastOrdersGET();
  }
Help(){
  alert('Please contact us at 081 765 4231 or email help.food@gmail.com to get help from our support team')
}
  ReOrder()
  {
    alert('lovely decision')
    this.router.navigate(['tabs/tab1']);

  }
  editAccount(){
    alert('edit');
  }

  // PastOrdersGET()
  // {
  //   this.PastOrders=this.DS.CartADD().map((Restaurant:Restaurants)=>{const {RName,RPrice,RDelFee}=Restaurant; const rPrice= RPrice+RDelFee})
  // }
  PastOrdersGET() {
    const ordersString = localStorage.getItem('PastOrders');
    const orders = ordersString ? JSON.parse(ordersString) : [];
  
    this.PastOrders = orders.map((Restaurant: Restaurants) => {
      const { RName, RPrice, RDelFee } = Restaurant;
      const rPrice = RPrice + RDelFee;
      return { rName: RName, rPrice: rPrice };
    });
  }
  
  
}
