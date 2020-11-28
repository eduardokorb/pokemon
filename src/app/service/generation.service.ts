import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenerationService {


  constructor(private http: HttpClient) { }

  getGenerationAll() {
    return this.http.get("https://pokeapi.co/api/v2/generation/")
  }

  getGeneration(id) {
    return this.http.get(`https://pokeapi.co/api/v2/generation/${id}/`) 
  }
}
