import { Component, OnInit, Input } from '@angular/core';
import { Orders } from '../_models/orders';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-item',
  templateUrl: './orders-item.component.html',
  styleUrls: ['./orders-item.component.css']
})
export class OrdersItemComponent implements OnInit {
  @Input() order: Orders;
  constructor(private router: Router) {}

  ngOnInit() {}

  orderDetails() {
    this.router.navigate(['/orders/', this.order.id]);
  }

}
