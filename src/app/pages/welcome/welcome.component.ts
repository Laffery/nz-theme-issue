import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less'],
  imports: [FormsModule, NzInputModule],
  host: {
    'display': 'block',
    'height': '100%',
  }
})
export class WelcomeComponent  {}
