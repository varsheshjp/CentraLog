import { Router } from '@angular/router';
import { Project } from 'src/app/Models/project.model';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { OnInit } from "@angular/core";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RestApiService } from 'src/app/Services/rest.service';
import { Log } from 'src/app/Models/log.model';
import { LocalStorageService } from 'src/app/Services/localStorage.service';
@Component({
    selector: 'app-all-logs',
    templateUrl: './AllLog.component.html'
})
export class AllLogComponent implements OnInit {
    public logs:Log[];
    title = 'Logs';
    dataSource: any;
    displayedColumns = ['_id','logMessage', 'createDate', 'type'];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
    loading = true;
    isPreloadTextViewed = true;
    constructor(
        private service: RestApiService,
        public dialog: MatDialog,
        private _router: Router,
        private _localStorage:LocalStorageService
    ) { }
    ngOnInit(): void {
        let token = sessionStorage.getItem("token");
        if (token == null) {
            this._router.navigate(['/Login']);
        }
        this.getAllLogs();
    }
    public getAllLogs(){
        
        this.service.getAllLog(this._localStorage.getProject()).subscribe(
            Projects => {
                console.log(Projects)
                this.logs = Projects.logs;
                this.dataSource = new MatTableDataSource(this.logs);
                console.log(this.dataSource);
                this.dataSource.paginator = this.paginator;
                this.isPreloadTextViewed = false;
                this.loading = false;
            },
            err => {
                this.isPreloadTextViewed = false;
                this.loading = false;
                console.log(err);
            }
        );
    }
    public LiveLogs(){
        this._router.navigate(['/LiveLogs']);
    }
    public goBack(){
        this._router.navigate(['/Project']);
    }
}