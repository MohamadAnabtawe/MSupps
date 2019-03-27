import { Injectable } from '@angular/core';

import { EditProductComponent } from '../products/edit-product/edit-product.component';
import { CanDeactivate } from '@angular/router';
import { AddNewProductComponent } from '../products/add-new-product/add-new-product.component';

@Injectable()
export class PreventUnsavedAddChanges
  implements CanDeactivate<AddNewProductComponent> {
  canDeactivate(component: AddNewProductComponent) {
    if (component.addForm.dirty) {
      return confirm(
        'Are you sure you want to continue?, Any unsaved changes will be lost'
      );
    }
    return true;
  }
}
