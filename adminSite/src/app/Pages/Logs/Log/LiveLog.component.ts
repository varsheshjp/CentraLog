import { Router } from '@angular/router';
import { Project } from 'src/app/Models/project.model';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RestApiService } from 'src/app/Services/rest.service';
import { Log } from 'src/app/Models/log.model';
import { LocalStorageService } from 'src/app/Services/localStorage.service';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-live-logs',
  templateUrl: './LiveLog.component.html',
})
export class LiveLogComponent implements OnInit {
  public logs: Log[];
  timer: any;
  flag: boolean;
  title = 'Live Logs';
  dataSource: any;
  displayedColumns = ['_id', 'logMessage', 'createDate', 'type'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  @ViewChild(MatSort)sort:MatSort;
  loading = true;
  isPreloadTextViewed = true;
  constructor(
    private service: RestApiService,
    public dialog: MatDialog,
    private _router: Router,
    private _localStorage: LocalStorageService
  ) {}
  ngOnInit(): void {
    let token = sessionStorage.getItem('token');
    if (token == null) {
      this._router.navigate(['/Login']);
    }
    this.flag = false;
    this.getLiveLogs();
  }
  public startTimer() {
    this.timer = setInterval(() => {
      this.getLiveLogs();
    }, 1000);
  }
  public stopTimer() {
    clearInterval(this.timer);
  }
  public getLiveLogs() {
    this.service.getLatestLog(this._localStorage.getProject()).subscribe(
      (Projects) => {
        console.log(Projects);
        this.logs = Projects.logs;
        this.dataSource = new MatTableDataSource(this.logs);
        console.log(this.dataSource);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator = this.paginator;
        this.isPreloadTextViewed = false;
        this.loading = false;
      },
      (err) => {
        this.isPreloadTextViewed = false;
        this.loading = false;
        console.log(err);
      }
    );
  }
  public goBack() {
    this.stopTimer();
    this._router.navigate(['/Logs']);
  }
  public start() {
    if (this.flag == false) {
      this.flag = true;
      this.startTimer();
    } else {
      this.flag = false;
      this.stopTimer();
    }
  }
}
