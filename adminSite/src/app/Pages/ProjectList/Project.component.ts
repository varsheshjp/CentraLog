import { Router } from '@angular/router';
import { Project } from 'src/app/Models/project.model';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { OnInit } from "@angular/core";
import { RestApiService } from '../../Services/rest.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
@Component({
    selector: 'app-Logs',
    templateUrl: './Project.component.html'
})
export class ProjectComponent implements OnInit {
    title = 'Project';
    public projects: Project;
    dataSource: any;
    displayedColumns = ['id', 'name', 'created', 'updated', 'logCount', 'user_id', "action"];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
    loading = true;
    isPreloadTextViewed = true;
    projectList: Project[];
    constructor(
        private service: RestApiService,
        public dialog: MatDialog,
        private _router: Router
    ) { }
    ngOnInit(): void {
        let token = sessionStorage.getItem("token");
        if (token == null) {
            this._router.navigate(['/Login']);
        }
        this.getAllProjects();
    }

    getAllProjects() {

        this.service.getProjectList().subscribe(
            Projects => {

                this.projectList = Projects.projectDetails;
                this.dataSource = new MatTableDataSource(this.projectList);
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
    // editCustomer(index) {
    //     const _saveMessage = `Contact Updated successfully.`;
    //     const _messageType = MessageType.Update;
    //     this.QuoteContract = this.AllQuoteContract[index];
    //     const dialogRef = this.dialog.open(ContactDialogComponent, { data: this.QuoteContract, width: '300px' });
    //     dialogRef.afterClosed().subscribe(res => {
    //         if (!res) {
    //             return;
    //         }

    //         this.AllQuoteContract[index] = res.data;
    //         this.layoutUtilsService.showActionNotification(_saveMessage, _messageType, 10000, true, true);
    //         this.allQuoteContractlength = this.AllQuoteContract.length > 0 ? true : false;
    //     });


    // }

    // Delete(customerId): void {
    //     var _title = "Customer Delete";
    //     var _description = "Are you sure to permanently delete this Customer?";
    //     var _waitDesciption = "Customer is deleting...";
    //     var _deleteMessage = "Customer has been deleted";
    //     const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    //     dialogRef.afterClosed().subscribe(res => {
    //         if (!res) {
    //             return;
    //         }
    //         this.customersService.DeleteCustomer(customerId).subscribe
    //             (
    //                 response => {
    //                     if (response.statusCode == "200") {
    //                         this.getAllCustomer();
    //                         this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
    //                     }
    //                     else {
    //                         this.toastr.error('Error', "Something Went Wrong");
    //                     }
    //                 }
    //             )
    //     });
    // }


}