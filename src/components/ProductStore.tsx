import * as React from "react";
import { inject, observer } from "mobx-react";
import { Root } from "../mst";
import { ProductEditComponent } from "./ProductEdit";
import "./ProductStore.css";

interface ProductStoreComponentProps {
  rootTree?: Root;
}

interface ProductStoreComponentState {
  productName: string;
  no_of_items: string;
  searchString: string;
}

@inject("rootTree")
@observer
class ProductStoreComponent extends React.Component<
ProductStoreComponentProps,
ProductStoreComponentState
> {
  constructor(props: ProductStoreComponentProps) {
    super(props);
    this.state = {
      productName: "",
      no_of_items: "",
      searchString: ""
    };
  }

  changeProductName = (e: any) => {
    const productName = e.target.value;
    this.setState({ productName });
  };

  changeHoursWorked = (e: any) => {
    const no_of_items = e.target.value;
    this.setState({ no_of_items });
  };

  searchStringChange = (e: any) => {
    const searchString = e.target.value;
    this.setState({ searchString });
  };

  onSubmit = (e: any) => {
    e.preventDefault();

    const { productName, no_of_items } = this.state;
    const { rootTree } = this.props;
    if (!rootTree) return null;
    rootTree.store.newProduct(productName, parseInt(no_of_items));
    this.setState({ productName: "", no_of_items: "" });
  };

  render() {
    const { rootTree } = this.props;
    const { productName, no_of_items, searchString } = this.state;
    if (!rootTree) return null;
    const num_products = rootTree.store.num_products;
    const filtered_product = rootTree.store.filtered_product(
      searchString
    );
    return (
      <div className="store"> 
        <div className = "header">
        <h1>{rootTree.store.name}</h1>
        <h3>{rootTree.store.location}</h3>
        <p>{`Total Number of Products: ${num_products}`}</p>
        </div>
        <hr/>
        <div className = "form">
        <h4>New Product</h4>
        <form onSubmit={this.onSubmit}>
          <p>Name: </p>
          <input className = "form-input"value={productName} onChange={this.changeProductName} />
          <p>No of Items: </p>
          <input className = "form-input" value={no_of_items} onChange={this.changeHoursWorked} />
          <br />
          <button>Submit</button>
        </form>
        </div>
        <hr />
      
        <input className = "form-input"
          placeholder="Search Product Name"
          value={searchString}
          onChange={this.searchStringChange}
        />
        {filtered_product.map(product => (
          <ProductEditComponent product={product} key={product.id} />
        ))}
      </div>
    );
  }
}

export { ProductStoreComponent };
