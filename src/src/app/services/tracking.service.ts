import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  constructor() { }
  lastPublicSheetId: number = -1; 
  lastPrivateSheetId: number = -1;

  setPublicSheetId(id: number) {
    this.lastPublicSheetId = id;
  }

  getPublicSheetId(): number {
    return this.lastPublicSheetId;
  } 

  setPrivateSheetId(id: number) {
    this.lastPrivateSheetId = id;
  }

  getPrivateSheetId(): number {
    return this.lastPrivateSheetId;
  } 
}
