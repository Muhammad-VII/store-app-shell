import {
  AfterViewInit,
  Component,
  inject,
  Injector,
  QueryList,
  signal,
  ViewChildren,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicComponentDirective } from '../../directives/dynamic-component.directive';
import { DynamicComponentsLoadService } from '../../services/dynamic-component-loading/dynamic-components-load.service';
import { EventBusService } from '../../services/event-bus/event-bus.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterOutlet, DynamicComponentDirective],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements AfterViewInit {
  dynamicComponentsLoadService = inject(DynamicComponentsLoadService);
  // Use @ViewChildren to access multiple instances of the directive
  @ViewChildren(DynamicComponentDirective)
  dynamicHosts!: QueryList<DynamicComponentDirective>;
  eventBusService = inject(EventBusService);

  productData = signal({
    productId: 1,
    productPrice: 10,
    productName: 'Hyper X Headset',
    quantity: 5,
  });

  constructor(private injector: Injector, private toastr: ToastrService) {
    this.eventBusService.listenForEvent('add-product', (event) => {
      this.productData.set({
        ...this.productData(),
        quantity:
          this.productData().quantity !== 0
            ? this.productData().quantity - 1
            : 0,
      });
      this.productData().quantity !== 0
        ? this.toastr.success(
            `${event.detail.product.productName} added to cart`
          )
        : this.toastr.error('Product out of stock');
    });
  }

  async ngAfterViewInit() {
    const componentsToLoad = [
      {
        remoteName: 'blue-team',
        exposedModule: './Button',
        index: 0,
      },
      {
        remoteName: 'green-team',
        exposedModule: './RelatedProducts',
        index: 1,
      },
    ];
    this.dynamicComponentsLoadService.loadComponent(
      this.dynamicHosts,
      componentsToLoad,
      this.injector,
      this.productData
    );
  }
}
