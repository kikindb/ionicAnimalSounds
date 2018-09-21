import { Component } from '@angular/core';
import { NavController, Refresher, reorderArray } from 'ionic-angular';
import { ANIMALS } from '../../data/data.animales';
import { Animal } from "../../interfaces/animal.interface"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private animals:Animal[] = [];
  private audio = new Audio();
  private audioTime: any;
  public ordering:boolean = false;

  constructor(public navCtrl: NavController) {
    this.animals = ANIMALS.slice(0);
  }

  playSound(animal:Animal){

    this.pauseSound(animal);
    
    if(animal.reproduciendo){
      animal.reproduciendo = false;
      return;
    }
    
    this.audio.src = animal.audio;

    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;

    this.audioTime = setTimeout(()=>animal.reproduciendo = false, animal.duracion * 1000);

  }

  private pauseSound(selAnimal:Animal){
    clearTimeout(this.audioTime);
    this.audio.pause();
    this.audio.currentTime = 0;

    for(let animal of this.animals){
      if(animal.nombre != selAnimal.nombre){
        animal.reproduciendo = false;
      }
    }
  }

  public deleteAnimal(idx:number){
    this.animals.splice(idx,1);
  }


  refreshAnimalList(refresher:Refresher){
    console.log("Starting Refresh");
    setTimeout( ()=> {
      console.log("Refreshed");
      this.animals = ANIMALS.slice(0);
      refresher.complete();
    }, 1500);
  }

  reorderAnimalList(indexes:any){
    console.log(indexes);
    this.animals = reorderArray(this.animals,indexes);
  }
}
