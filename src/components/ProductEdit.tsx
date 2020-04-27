import * as React from "react";
import { Product } from "../mst";
import { observer, inject } from "mobx-react";

interface ProductEditComponentProps {
  product: Product;
}

interface ProductEditComponentState {
  productName: string;
  no_of_items: string;
  edit: boolean;
}

@inject("rootTree")
@observer
class ProductEditComponent extends React.Component<
ProductEditComponentProps,
ProductEditComponentState
> {
  constructor(props: ProductEditComponentProps) {
    super(props);

    this.state = {
      productName: this.props.product.name,
      no_of_items: `${this.props.product.no_of_items}`,
      edit: false
    };
    this.changeProductName = this.changeProductName.bind(this);
    this.changeHoursWorked = this.changeHoursWorked.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  changeProductName(e: any) {
    const productName = e.target.value;
    this.setState({ productName });
  }

  changeHoursWorked(e: any) {
    const no_of_items = e.target.value;
    this.setState({ no_of_items });
  }

  toggleEdit() {
    this.setState(prev => ({ edit: !prev.edit }));
  }

  onSubmit(e: any) {
    e.preventDefault();

    const { productName, no_of_items } = this.state;
    this.props.product.editProduct(productName, parseInt(no_of_items));
    this.toggleEdit();
  }

  render() {
    const { no_of_items, name } = this.props.product;
    const { edit } = this.state;
    return (
      <div>
        {edit ? (
          <form onSubmit={this.onSubmit}>
            <input className = "form-input"
              value={this.state.productName}
              onChange={this.changeProductName}
            />
            <input className = "form-input"
              value={this.state.no_of_items}
              onChange={this.changeHoursWorked}
            />
            <button type="submit">submit</button>
            <button type="button" onClick={this.toggleEdit}>
              cancel
            </button>
          </form>
        ) : (
          <>
            <p>{`Name: ${name}`}</p>
            <p>{`Item Available: ${no_of_items}`}</p>
            <button onClick={this.toggleEdit}>Edit</button>
          </>
        )}
      </div>
    );
  }
}

export { ProductEditComponent };
