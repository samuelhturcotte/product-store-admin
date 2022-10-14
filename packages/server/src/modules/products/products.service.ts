import { Injectable } from '@nestjs/common';
import ProductStore from './products.store';
import { Product } from './types';

@Injectable()
export class ProductsService {
  private products: Product[] = ProductStore;

  private upsert(array: Product[], element: Product) {
    const i = array.findIndex(
      (_element) => Number(_element.id) === Number(element.id),
    );
    if (i > -1) {
      array[i] = element;
      return element;
    } else {
      const newElement = { ...element, id: array.length + 1 };
      array.push(newElement);
      return newElement;
    }
  }

  /**
   *
   * Expose method for controller, remove private configs from each feature
   */
  listProducts() {
    // return all products that aren't deleted
    return this.products.filter((product) => !product.deleted);
  }

  listProduct(id: number) {
    return this.products.find(
      (product) => Number(product.id) === Number(id) && !product.deleted,
    );
  }
  upsertProducts(newProducts: Product[]) {
    // if we find the product and it's deleted we should restore, otherwise continue to upsert
    const upsertedProducts = [];
    newProducts.forEach((newProduct) =>
      upsertedProducts.push(
        this.upsert(this.products, { ...newProduct, deleted: false }),
      ),
    );
    return upsertedProducts;
  }

  deleteProducts(idsToDelete: number[]) {
    // virtually delete
    let success = false;
    this.products = this.products.map((item) => {
      const itemToDelete = idsToDelete.find((id) => id === item.id);
      if (itemToDelete) {
        success = true;
        return { ...item, deleted: true };
      }
      return item;
    });
    return success;
  }
}
