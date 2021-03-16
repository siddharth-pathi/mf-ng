import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
    selector: 'mf-ng-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    sltForm: FormGroup;
    items = [
        {
            id: 1,
            name: 'Item 1'
        },
        {
            id: 2,
            name: 'Item 2'
        },
        {
            id: 3,
            name: 'Item 3'
        },
        {
            id: 4,
            name: 'Item 4'
        },
        {
            id: 5,
            name: 'Item 5'
        },
    ];

    constructor(private router: Router) { }

    ngOnInit() {
        localStorage.setItem('selectedItems', JSON.stringify([]));
        const obj = {};
        this.items.forEach((item: any) => {
            obj[item.name] = new FormControl('');
        });

        this.sltForm = new FormGroup({ ...obj });

        this.sltForm.valueChanges.subscribe(val => {
            const count = Object.values(val).filter(isChecked => isChecked).length;

            const customEvent = new CustomEvent('itemCount', {detail: count});

            document.dispatchEvent(customEvent);
        });
    }

    handleSubmit() {
        console.log('form submitted', this.sltForm.value);

        const result = Object.entries(this.sltForm.value).filter(([name, value]) => value)
            .map(([name, value]) => ({ name, value }));

        localStorage.setItem('selectedItems', JSON.stringify(result));

        this.router.navigate(['/review']);
    }
}