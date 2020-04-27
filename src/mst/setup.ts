import { RootModel } from ".";
import { onSnapshot, getSnapshot, applySnapshot } from "mobx-state-tree";

export const setupRootStore = () => {
  const rootTree = RootModel.create({
    store: {
      id: "1",
      name: "Food Basket",
      location: "Online Store ",
      products: []
    }
  });
  onSnapshot(rootTree, snapshot => console.log("snapshot: ", snapshot));
  return { rootTree };
};
