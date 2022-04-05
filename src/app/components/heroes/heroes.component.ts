import { Component, OnInit } from '@angular/core';
import { Hero } from '../../data/hero';
import { HeroService } from '../../services/hero/hero.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  nameHero: string = "";

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  createHero(): void {
    let hero = new Hero();
    let exists = false;
    hero.name = this.nameHero;
    // If name already taken : exit
    this.heroes.forEach(h => {
      if (h.name === hero.name) {
        exists = true;
      }
    });
    // Save hero to DB if name doesn't exist already
    if (!exists) this.heroService.addHero(hero);
  }

  deleteHero(hero: Hero): void {
    this.heroService.deleteHero(hero);
  }
}
