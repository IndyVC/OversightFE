import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private firestore:AngularFirestore) { }

  createIncome(data){
    return new Promise<any>((resolve,reject)=>{
      this.firestore
      .collection('incomes')
      .add(data)
      .then(res=>{console.log(data)}, err => reject(err));
    });
  }
}
