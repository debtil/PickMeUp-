import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recuperacao',
  templateUrl: './recuperacao.component.html',
  styleUrls: ['./recuperacao.component.scss']
})
export class RecuperacaoComponent implements OnInit {
  FormRecuper!: FormGroup;
  isSubmitted: boolean = false;
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.FormRecuper = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    })
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.FormRecuper.valid){
      this.isSubmitted = false;
      this.FormRecuper.reset();
      alert("Todos os campos são Obrigatórios!");
      return false;
    }
    this.enviarRecuperacao();
      return true;
  }

  enviarRecuperacao(){
    this.authService.recuperacao(this.FormRecuper.controls['email'].value);
  }

  getErrorControl(control: string, error: string): boolean {
    return this.FormRecuper.controls[control].hasError(error)
  }
}
