import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GenerationService } from '../service/generation.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public generationPokemon$: Observable<any>
  constructor(private generation: GenerationService, private router: Router) {}

  ngOnInit() { 
    this.generationPokemon$ = this.generation.getGenerationAll()
  }

  changeRoute(numberGeneration, name){
    this.router.navigate(['/generation',{ id:numberGeneration + 1, name: name }]);
  }
}

