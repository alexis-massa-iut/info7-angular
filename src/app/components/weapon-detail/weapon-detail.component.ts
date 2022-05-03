import { Component, OnInit, Input } from '@angular/core';
import { Weapon } from '../../data/weapon';
import { WeaponService } from '../../services/weapon/weapon.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: ['./weapon-detail.component.css'],
})
export class WeaponDetailComponent implements OnInit {
  weapon?: Weapon = new Weapon();
  maxStat: number = 0;

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getWeapon();
  }

  /**
   * Go back to previous page
   * @returns void
   */
  goBack(): void {
    if (
      confirm('Attention : Toute modification non sauvegardée sera supprimée !')
    )
      this.location.back();
  }

  /**
   * Get weapon from firebase
   * @returns void
   */
  getWeapon(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null)
      this.weaponService
        .getWeapon(id)
        .subscribe((weapon) => (this.weapon = weapon));
  }

  /**
   * Save weapon in firebase
   * @returns void
   */
  save(): void {
    // UPDATE HERO DETAILS
    if (this.weapon) this.weaponService.updateWeapon(this.weapon);
  }

  // Get total points assigned
  getTotalStats(): number {
    let totalStats: number = 0;
    if (this.weapon) {
      if (this.weapon.attack) totalStats += this.weapon.attack;
      if (this.weapon.hp) totalStats += this.weapon.hp;
      if (this.weapon.damage) totalStats += this.weapon.damage;
      if (this.weapon.dexterity) totalStats += this.weapon.dexterity;
      return totalStats;
    }
    return 0;
  }

  /**
   *
   * @param changedStat stat that is being changed
   * @param newValue new value of changedStat
   */
  changeStat(changedStat: string, newValue: number): void {
    if (newValue < -5 || newValue > 5) return;
    if (this.weapon != undefined) {
      if (changedStat == 'attack') this.weapon.attack = newValue;
      else if (changedStat == 'dexterity') this.weapon.dexterity = newValue;
      else if (changedStat == 'hp') this.weapon.hp = newValue;
      else if (changedStat == 'damage') this.weapon.damage = newValue;
    }
    this.checkStats();
  }

  /**
   * Check weapon stats
   * Add additional stat checks here
   * @returns Boolean true if valid stats. Returns false if stats are invalid
   */
  checkStats(): boolean {
    if (!this.weapon) return true; // If weapon deosn't exist (then default values)

    if (Number(this.getTotalStats()) != this.maxStat) return false; // Too many points assigned

    //* These should never happen
    if (this.weapon.attack < -5 || this.weapon.attack > 5) return false; // Too little / much attack
    if (this.weapon.dexterity < -5 || this.weapon.dexterity > 5) return false; // Too little / much dexterity
    if (this.weapon.hp < -5 || this.weapon.hp > 5) return false; // Too little / much hp
    if (this.weapon.damage < -5 || this.weapon.damage > 5) return false; // Too little / much damage

    return true; // No error
  }

  /**
   * Check if name is correct
   * @return true if name is correct, false if not.
   */
  checkName(): boolean {
    // Name is empty
    if (!this.weapon) return true; // default value
    if (this.weapon.name == '') return false; // name is empty
    return true;
  }
}
