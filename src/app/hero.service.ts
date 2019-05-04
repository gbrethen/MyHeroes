import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Md5 } from 'ts-md5/dist/md5';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private hero: Hero;
  private result: any;

  private ts = new Date().getTime();
  private apiKey = '2c8cf9fa19255c68f87425a717579291';
  private privateKey = 'e4b9fab098f4577f37048b324d71ee66281c';
    
  private heroesUrl = 'https://gateway.marvel.com:443/v1/public/characters/'; //URL to api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getHash() {
    return Md5.hashStr(this.ts + this.privateKey + this.apiKey).toString();
  }
  
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    var fetchUrl = this.heroesUrl + id + '?apikey=' + this.apiKey;

    return this.http.get<Hero>(fetchUrl);
  }

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add("HeroService: fetched heroes.");
    return of (HEROES);
  }

}
