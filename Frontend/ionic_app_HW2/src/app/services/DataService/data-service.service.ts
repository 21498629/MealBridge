import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Restaurants={
  RID:number;
  RImage:string;
  RName:string;
  RDistance:number;
  RArea:string;
  RDetails:string;
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
          RID:1,RName:'Manhatten Hotel',RImage:'assets/images/manhatten hotel.jpg',
          RArea:'Pretoria', RDistance: 0.7, RDetails: 'Food serves around 50 People, pickup from 10am to 1pm'
        },
        {
          RID:2,RName:'Garden Courts',RImage:'assets/images/garden court.jpg',
          RArea:'Johanesburg', RDistance: 5.1, RDetails: 'Food serves around 100 People, pickup from 1pm to 4pm'
        },
        {
          RID:3,RName:'Holiday Inn',RImage:'assets/images/holiday inn.jpg',
          RArea:'Johanesburg', RDistance: 9.2, RDetails:'Food serves around 250 People, pickup from 10am to 1pm'
        }, 
        {
          RID:4,RName:'Protea Hotel',RImage:'assets/images/protea hotel.jpg',
          RArea:'Pretoria', RDistance: 0.4, RDetails:'Food serves around 80 People, pickup from 10am to 12pm'
        },
        {
          RID:5,RName:'MINT Hotel',RImage:'assets/images/MINT hotel.jpeg',
          RArea:'Johanesburg', RDistance: 11.4, RDetails:'Food serves around 30 People, pickup from 11am to 1pm'
        },
        {
          RID:6,RName:'The Regency',RImage:'assets/images/the regency.jpg',
          RArea:'Pretoria', RDistance: 1.3, RDetails:'Food serves around 150 People, pickup from 10am to 1pm'
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
    // let FoodPrice = Cart[x].RPrice + Cart[x].RDelFee;
    // Total += FoodPrice;
    // CartTotal.push({ ...Cart[x], FoodPrice });
  }
  
  return Total;
}


//  CartDELETE(rID:number):void
//  {
//   let theCart=localStorage.getItem('Cart');
//   if(theCart)
//   {
//     if (theCart) {
//       const itemcart = JSON.parse(theCart);
//       const iditem = itemcart.findIndex((id: number) => id === rID);
//       if (iditem !== -1) {
//         itemcart.splice(iditem, 1);
//         localStorage.setItem('cart', JSON.stringify(itemcart));
//       }
//   }
//  }


// }

}
