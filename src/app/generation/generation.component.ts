import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router'

import { GenerationService } from '../service/generation.service';

export interface PokemonData 
  {
    name: string;
  };


@Component({
  selector: 'app-generation',
  templateUrl: './generation.component.html',
  styleUrls: ['./generation.component.scss']
})
export class GenerationComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name'];
  dataSource: MatTableDataSource<PokemonData[]>;
  generationNumber;
  gameName;
  amountPokemon;
  generationName;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private generation: GenerationService, private activatedRoute : ActivatedRoute ) { }
  
  ngOnInit() {
    console.log("ngOnInit")
    this.generationNumber = this.activatedRoute.snapshot.params.id
    this.generation.getGeneration(this.generationNumber).subscribe((response:any) => {
      this.dataSource = new MatTableDataSource(response.pokemon_species);
      this.dataSource.length = response.pokemon_species.length
      this.gameName = response.version_groups;
      this.amountPokemon = response.pokemon_species.length;
      this.generationName = response.names.find( data => data.language.name === "en" )
    })
  }
  
  ngAfterViewInit() {
    console.log("ngAfterViewInit")
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
