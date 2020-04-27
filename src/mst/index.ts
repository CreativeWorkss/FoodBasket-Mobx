import {
  types,
  Instance,
  applySnapshot,
  flow,
  onSnapshot
} from "mobx-state-tree";
import uuid from "uuid/v4";
import api from "axios";

const ProductModel = types
  .model("Product", {
    id: types.identifier,
    name: types.string,
    no_of_items: types.number
  })
  .actions(self => {
    function editProduct(name: string, no_of_items: number) {
      applySnapshot(self, { ...self, name, no_of_items });
    }
    return { editProduct };
  });

const StoreName = types
  .model("Store", {
    id: types.identifier,
    name: types.string,
    location: types.string,
    products: types.array(ProductModel)
  })
  .actions(self => {
    function newProduct(name: string, no_of_items: number) {
      const id = uuid();
      applySnapshot(self, {
        ...self,
        products: [{ id, name, no_of_items }, ...self.products]
      });
    }
    const save = flow(function* save(snapshot: any) {
      try {
        const response = yield api.post("/products", { snapshot });
        console.log("response: ", response);
      } catch (e) {
        console.log("error: ", e);
      }
    });
    function afterCreate() {
      onSnapshot(self, (snapshot: any) => save(snapshot));
    }
    return { newProduct, save, afterCreate };
  })
  .views(self => ({
    get num_products() {
      return self.products.length;
    },
    filtered_product(searchString: string) {
      return self.products.filter(products =>
        products.name.includes(searchString)
      );
    }
  }));

const RootModel = types.model("Root", {
  store: StoreName
});

export { RootModel };

export type Root = Instance<typeof RootModel>;
export type Store = Instance<typeof StoreName>;
export type Product = Instance<typeof ProductModel>;
