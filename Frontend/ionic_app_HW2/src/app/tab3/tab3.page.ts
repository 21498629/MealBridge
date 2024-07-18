import { Component,OnInit } from '@angular/core';
import { DataServiceService,Restaurants } from '../services/DataService/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
   DelAddress:string="";
    public EAddress:boolean=false;
  // TPrice:number=0;
  // TDelFee:number=0;
 CartItems:Restaurants[]=[];
 CartTotal:number=0;

  constructor(private DS:DataServiceService,private router:Router) 
  {}
  ngOnInit()
  {
    this.CartItemsGET();
    
  }

  // PaymentMADE()
  // {
  //   alert('The payment was made successfully')
  //   this.router.navigate(['tabs/tab4']);
  // }
   
  public AddressEDIT():void
  {
    this.EAddress=true;
    
  }
  AddressSAVE()
  {
    localStorage.setItem('DelAddress', this.DelAddress);
    this.EAddress=false;
  }
CartItemsGET()
{
  let theCart = localStorage.getItem("Cart");
  if (theCart) {
    this.CartItems = JSON.parse(theCart);
  }

  this.CartTotal = this.DS.CartSAVE(this.CartItems);
}

CartDELETE(restaurant: Restaurants) {
  let theCart = localStorage.getItem('Cart');
  let CartItems: any[] = [];

  if (theCart) {
    CartItems = JSON.parse(theCart);
  }

  let index = CartItems.findIndex(item => item.ID === restaurant.RID.toString());

  if (index !== -1) {
    CartItems.splice(index, 1);
    localStorage.setItem('Cart', JSON.stringify(CartItems));
    this.CartItemsGET();
  }
}

}
