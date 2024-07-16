import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Restaurants={
  RID:number;
  RImage:string;
  RName:string;
  RDistance:number;
  RType:string;
  RRating:number;
  RPrice:number;
  RDelFee:number;
  RTime:number;
  // RQuantity:number;
  
}

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
 private Restaurant: Restaurants[];
  constructor() { 
    const FoodInfo= localStorage.getItem("Restaurant");

    if(FoodInfo)
    {
      this.Restaurant = JSON.parse(FoodInfo);
    }
    else
    {
      this.Restaurant =[
        {
          RID:1,RName:'ROCCOMAMAS',RImage:'assets/images/Burger-and-Fries.jpg',
          RType:'Burger', RRating:3.9, RDistance: 0.3, RPrice:85, RDelFee:30, RTime:25
        },
        {
          RID:2,RName:'TASHAS',RImage:'assets/images/pasta.jpg',
          RType:'Italian', RRating:4.8, RDistance: 6.2, RPrice:105, RDelFee:30,RTime:30
        },
        {
          RID:3,RName:'CHIAPAS',RImage:'assets/images/burrito-bowl.jpg',
          RType:'Mexican', RRating:4.3, RDistance: 2.3, RPrice:100, RDelFee:30, RTime:15
        },
        {
          RID:4,RName:'SPUR',RImage:'assets/images/wings.jpg',
          RType:'American', RRating:3.7, RDistance: 0.5, RPrice:89, RDelFee:30,RTime:35
        }
        // {
        //   RID:5,RName:'SALSA',RImage:'assets/images/tacos.jpg',
        //   RType:'Tacos', RRating:3.7, RDistance: 2.5, RPrice:70, RDelFee:40
        // }
      ];
      this.RestaurantSAVE();
    }
  }
  
//this gets the restaurants 

  RestaurantGET():Restaurants[]
  {
    return this.Restaurant;
  }
  RestaurantGETbyID(ID:number):Restaurants|undefined {
    return this.Restaurant.find((food:Restaurants)=> food.RID === ID);
}

  // RestaurantbyID(ID:number):Observable<any>
  // {
  //   let FoodInfo:Restaurants[]=[];
  //   if(localStorage.getItem('FoodInfo'))
  //   {
  //     FoodInfo =JSON.parse(localStorage.getItem('FoodInfo')!)
  //   }
  //   let ResFood:any=FoodInfo.find(ResFood => ResFood.RID ===ID)
  //   return (ResFood)
  // }

RestaurantSAVE()
{
  localStorage.setItem('Resturants', JSON.stringify(this.Restaurant));
}

// RestaurantSEARCH(rName:string, rType:string,rRating:number,rDistance:number,rPrice:number):Restaurants[]{
//   let findRest = this.Restaurant;
//   if(rName)
//   {
//     findRest=findRest.filter(a=>a.RName.toLowerCase().includes(rName.toLowerCase()));
//   }
//   if(rType)
//   {
//     findRest=findRest.filter(a=>a.RType.toLowerCase().includes(rType.toLowerCase()));
//   }
//   if(rDistance)
//   {
//     findRest=findRest.filter(a=>a.RDistance<=rDistance);
//   }
//   if(rType)
//   {
//     findRest=findRest.filter(a=>a.RType.toLowerCase().includes(rType.toLowerCase()));
//   }
//   if(rPrice)
//   {
//     findRest=findRest.filter(a=>a.RDistance<=rPrice);
//   }
//   return findRest;

// }

//save the updated cart items array into the local storage
// CartADD(Restaurant: Restaurants) {
//   let theCart = localStorage.getItem('Cart');
//   let CartItems: any[] = [];

//   if (theCart) {
//     CartItems = JSON.parse(theCart);
//   }

//   CartItems.push({ ...Restaurant, ID: Restaurant.RID.toString() });
//   localStorage.setItem('Cart', JSON.stringify(CartItems));
// }

CartADD(Restaurant: Restaurants) {
  let theCart = localStorage.getItem('Cart');
  let CartItems: any[] = [];

  if (theCart) {
    CartItems = JSON.parse(theCart);
  }

  if (!Array.isArray(CartItems)) {
    CartItems = [];
  }

  CartItems.push({ ...Restaurant, ID: Restaurant.RID.toString() });
  localStorage.setItem('Cart', JSON.stringify(CartItems));
}

CartSAVE(Cart: Restaurants[]): number {
  let CartTotal = [];
  let Total = 0;

  for (let x = 0; x < Cart.length; x++) {
    let FoodPrice = Cart[x].RPrice + Cart[x].RDelFee;
    Total += FoodPrice;
    CartTotal.push({ ...Cart[x], FoodPrice });
  }
  
  return Total;
}
 CartDELETE(rID:number):void
 {
  let theCart=localStorage.getItem('Cart');
  if(theCart)
  {
    if (theCart) {
      const itemcart = JSON.parse(theCart);
      const iditem = itemcart.findIndex((id: number) => id === rID);
      if (iditem !== -1) {
        itemcart.splice(iditem, 1);
        localStorage.setItem('cart', JSON.stringify(itemcart));
      }
  }
 }


}

}
