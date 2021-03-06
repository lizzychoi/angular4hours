/*
  In this code we use HttpClient introduced in Angular 4.3
 */
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable} from "rxjs/Observable";
import {Component} from "@angular/core";

@Component({
  selector: 'app-root',
  template: `<h1>All Products</h1>
  <ul>
    <li *ngFor="let product of products">
       {{product.title}}
    </li>
  </ul>
  `})
export class AppComponent {

  products: Array<string> = [];

  theDataSource: Observable<string>;

  constructor(private http: HttpClient) {

    this.theDataSource = this.http.get('/api/products');
  }

  ngOnInit(){

    // Get the data from the REST server
    this.theDataSource.subscribe(
      data => {
        if (Array.isArray(data)){
          this.products=data;
        } else{
          this.products.push(data);
        }
      },
      err =>
        console.log("Can't get products. Error code: %s, URL: %s ",  err.status, err.url),
      () => console.log('Product(s) are retrieved')
    );
  }
}
