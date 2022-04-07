import { Component, OnInit } from '@angular/core';
import { Weapon } from '../../data/weapon';
import { WeaponService } from '../../services/weapon/weapon.service';


@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {
  weapons: Weapon[] = [];

  nameWeapon: string = "";

  constructor(private weaponService: WeaponService) { }

  ngOnInit(): void {
    this.getWeapons();
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  createWeapon(): void {
    let weapon = new Weapon();
    let exists = false;
    weapon.name = this.nameWeapon;
    // If name already taken : exit
    this.weapons.forEach(h => {
      if (h.name === weapon.name) {
        exists = true;
      }
    });
    // Save weapon to DB if name doesn't exist already
    if (!exists) this.weaponService.addWeapon(weapon);
  }

  deleteWeapon(weapon: Weapon): void {
    this.weaponService.deleteWeapon(weapon);
  }
}
