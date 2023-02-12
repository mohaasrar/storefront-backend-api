import { OrderStore } from '../../models/order';

const store = new OrderStore()

describe("Order Model Test", () => {
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

  it('create method should create an Order', async () => {
    const result = await store.create(2)
    expect(result).toBeDefined();
   });

  it('index method should return a list of order', async () => {
    const result = await store.index();
    expect(result).toBeDefined();
    expect(result?.length).toBeGreaterThan(0);
   
  });

  it('show method should return the order', async () => {
    const result = await store.show(2);
    expect(result).toBeDefined();
    expect(result?.id).toEqual(2);
      
    
  });

  it('delete method should remove the order', async () => {
    const result = await store.delete(2)
    expect(result).toBeDefined();
    expect(result?.id).toEqual(2);
  });
});
