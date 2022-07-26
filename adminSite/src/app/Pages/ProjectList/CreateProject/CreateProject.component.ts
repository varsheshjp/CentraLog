import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { OnInit } from "@angular/core";
import { Project } from 'src/app/Models/project.model';

@Component({
    selector: 'app-Logs',
    templateUrl: './CreateProject.component.html'
})
export class CreateProject implements OnInit {
    title = 'Project';
    public projects: Project;
    constructor() {
    }
    ngOnInit(): void {
    }
}