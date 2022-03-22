import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../../data/hero';
import { HeroService } from '../../services/hero/hero.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  hero?: Hero = new Hero();
  maxStat: Number = 40;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  /**
   * Go back to previous page
   * @returns void
   */
  goBack(): void {
    if (confirm('Attention : Toute modification non sauvegardée sera supprimée !'))
      this.location.back();
  }

  /**
   * Get hero from firebase
   * @returns void
   */
  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null)
      this.heroService.getHero(id)
        .subscribe(hero => this.hero = hero);
  }

  /**
   * Save hero in firebase
   * @returns void
   */
  save(): void {
    // UPDATE HERO DETAILS
    if (this.hero)
      this.heroService.updateHero(this.hero);
  }

  // Get total points assigned
  getTotalStats(): number | boolean {
    let totalStats: number = 0;
    if (this.hero) {
      if (this.hero.attack) totalStats += this.hero.attack;
      if (this.hero.hp) totalStats += this.hero.hp;
      if (this.hero.damage) totalStats += this.hero.damage;
      if (this.hero.dexterity) totalStats += this.hero.dexterity;
      return totalStats;
    } else {
      return false;
    }
  }

  /**
   *
   * @param changedStat stat that is being changed
   * @param newValue new value of changedStat
   */
  changeStat(changedStat: string, newValue: number): void {
    if (newValue < 1) return;
    if (this.hero != undefined) {
      switch (changedStat) {
        case "attack":
          if (this.hero.attack) this.hero.attack = newValue;
          break;
        case "dexterity":
          if (this.hero.dexterity) this.hero.dexterity = newValue;
          break;
        case "hp":
          if (this.hero.hp) this.hero.hp = newValue;
          break;
        case "damage":
          if (this.hero.damage) this.hero.damage = newValue;
          break;
      }
    }
    this.checkStats();
  }

  /**
   * Check hero stats
   * Add additional stat checks here
   * @returns Boolean true if valid stats. Returns false if stats are invalid
   */
  checkStats(): boolean {
    if (!this.hero) return true; // If hero deosn't exist (then default values)

    if (Number(this.getTotalStats()) > this.maxStat) return false; // Too many points assigned

    //* These should never happen
    if (this.hero.attack < 1) return false; // Too little attack
    if (this.hero.dexterity < 1) return false; // Too little dexterity
    if (this.hero.hp < 1) return false; // Too little hp
    if (this.hero.damage < 1) return false; // Too little damage

    return true; // No error
  }
}
