import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GenerationService } from './service/generation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'pokemonDelivery';
  public generationPokemon$: Observable <any>
  constructor(private generation: GenerationService, private router: Router) {}
  ngOnInit() { 
    this.generationPokemon$ = this.generation.getGenerationAll()
  }
  trocarRota(numberGeneration){
    this.router.navigate(['/generation',{id:numberGeneration + 1}]);
  }
}
