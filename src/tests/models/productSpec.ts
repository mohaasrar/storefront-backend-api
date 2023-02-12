import { ProductStore } from '../../models/product';

const store = new ProductStore()

describe("Product Model Test", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should create a Product', async () => {
    const result = await store.create({
      name: "TV",
      price: 500,
      category: 'Home'
    });
    expect(result).toBeDefined();
      
  });

  it('index method should return a list of product', async () => {
    const result = await store.index();
    expect(result).toBeDefined();
    expect(result?.length).toBeGreaterThan(0);
   
  });

  it('show method should return the correct product', async () => {
    const result = await store.show(2);
    expect(result).toBeDefined();
    expect(result?.id).toEqual(2);
      
    
  });

  it('delete method should remove the product', async () => {
    const result = await store.delete(2)
    expect(result).toBeDefined();
    expect(result?.id).toEqual(2);
  });
});
