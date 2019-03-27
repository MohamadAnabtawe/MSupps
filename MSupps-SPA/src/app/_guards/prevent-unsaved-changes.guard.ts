import { Injectable } from '@angular/core';

import { EditProductComponent } from '../products/edit-product/edit-product.component';
import { CanDeactivate } from '@angular/router';

@Injectable()
export class PreventUnsavedChanges
  implements CanDeactivate<EditProductComponent> {
  canDeactivate(component: EditProductComponent) {
    if (component.editForm.dirty) {
      return confirm(
        'Are you sure you want to continue?, Any unsaved changes will be lost'
      );
    }
    return true;
  }
}
