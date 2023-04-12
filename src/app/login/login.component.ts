import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder) {}
  @Input() onChange() {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      console.log('Invalid Form');
      return;
    }
    console.log(this.loginForm.value);
  }
}
