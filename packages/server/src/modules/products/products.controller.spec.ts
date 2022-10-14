import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(() => {
    productsService = new ProductsService();
    productsController = new ProductsController(productsService);
  });

  describe('listProducts', () => {
    it('should return an array of products', async () => {
      const result = {
        data: [
          { id: 1, title: 'iPhone X' },
          { id: 2, title: 'iPhone 9' },
        ],
        succeed: true,
      };
      jest
        .spyOn(productsService, 'listProducts')
        .mockImplementation(() => result.data);

      expect(await productsController.listProducts()).toStrictEqual(result);
    });
  });
  describe('listProduct', () => {
    it('should return single product based on id', async () => {
      const result = {
        data: { id: 1, title: 'iPhone X' },
        succeed: true,
      };
      jest
        .spyOn(productsService, 'listProduct')
        .mockImplementation(() => result.data);

      expect(await productsController.listProduct(1)).toStrictEqual(result);
    });
  });
});
