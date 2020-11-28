import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';


import { GenerationService } from '../service/generation.service';
import { FormControl } from '@angular/forms';

export interface PokemonData 
  {
    name: string;
  };


@Component({
  selector: 'app-generation',
  templateUrl: './generation.component.html',
  styleUrls: ['./generation.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GenerationComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  dataSource: MatTableDataSource<PokemonData[]>;
  generationNumber;
  gameName;
  amountPokemon;
  generationName;
  expandedElement: PokemonData | null;
  loading = true;
  pokemon;
  panelOpenState = false
  pokemonId


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private generation: GenerationService, private activatedRoute : ActivatedRoute ) { }
  
  ngOnInit() {
    this.generationNumber = this.activatedRoute.snapshot.params.id
    this.generation.getGeneration(this.generationNumber).subscribe((response:any) => {
      this.dataSource = new MatTableDataSource(response.pokemon_species);
      this.gameName = response.version_groups;
      this.amountPokemon = response.pokemon_species.length;
      this.generationName = response.names.find( data => data.language.name === "en" )
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getPokemon(expandedElement, element) {
    this.loading = true;
    this.pokemon = '';
    let pokemonId = element.url.split("/")

    console.log(pokemonId)

    await this.generation.getPokemon(pokemonId[6]).subscribe(data => {
      this.pokemon = data;
      console.log(data)
      this.loading = false;
    })
    this.expandedElement = expandedElement === element ? null : element;
  }
}
