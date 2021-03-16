import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'mf-ng-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
    constructor(private router: Router) {}

    selectedItems = [];

    ngOnInit() {
        console.log(localStorage.getItem('selectedItems'));
        this.selectedItems = JSON.parse(localStorage.getItem('selectedItems'));
    }

    handleClick() {
        this.router.navigate(['/feature']);
    }
}