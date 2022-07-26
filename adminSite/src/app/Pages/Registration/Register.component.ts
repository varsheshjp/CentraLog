import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { OnInit } from "@angular/core";
import { RestApiService } from '../../Services/rest.service';
import { Register } from '../../Models/register.model';

@Component({
    selector: 'app-Register',
    templateUrl: './Register.component.html'
})
export class RegisterComponent implements OnInit {
    public register: Register;
    constructor(private _api: RestApiService, private _router: Router) {
        this.register = new Register();
    }
    ngOnInit(): void {

    }
    Register() {
        debugger;
        this._api.register(this.register).subscribe((data) => {
            debugger;
            if (data.loginResult == "fail") {
                sessionStorage.setItem("token", '');
                console.log("fail");
            }
            else if (data.loginResult == "success") {
                // sessionStorage.setItem("token", data.token);
                // console.log(data.token);
                this._router.navigate(['/Login']);
            }
        });
    }
}