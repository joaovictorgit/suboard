import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  title = 'Home';
  constructor(private router: Router) {}

  onUser(r: Router) {
    this.router.navigate(['user']);
    console.log('Foi');
  }
}
