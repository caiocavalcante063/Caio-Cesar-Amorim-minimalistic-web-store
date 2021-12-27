import React, { Component } from "react";
import { connect } from "react-redux";
import { PRODUCT_QUERY } from "../graphQL/queries";
import { client } from "..";
import AddToCartButton from "../components/AddToCartButton";
import ProductAttributes from "../components/ProductAttributes";

class ProductDetails extends Component {
  constructor() {
    super();

    this.state = {
      productId: "",
      productDetails: {},
      selectedAttributes: {},
    };

    this.handleCart = this.handleCart.bind(this);
  }

  componentDidMount() {
    const path = window.location.pathname;
    const productId = path === "/" ? "all" : path.split("/")[2];

    this.setState({ productId }, () =>
      client
        .query({
          query: PRODUCT_QUERY,
          variables: { id: `${productId}` },
        })
        .then((result) =>
          this.setState({ productDetails: result.data.product })
        )
    );
  }

  handleCart(attributes) {
    this.setState((prevState) => ({
      selectedAttributes: {
        ...prevState.selectedAttributes,
        ...attributes,
      },
    }));
  }

  render() {
    const { productDetails, selectedAttributes } = this.state;
    const { currency } = this.props;
    const { brand, gallery, name, attributes, prices, description } =
      productDetails;
    const price =
      prices && prices.find((price) => price.currency.label === currency);

    return (
      <div className="product-details">
        <div className="product-details-gallery-container">
          {gallery &&
            gallery.map((image) => {
              return <img src={image} alt={name} width="150px" />;
            })}
        </div>
        <div className="product-details-main-img-container">
          {gallery && <img src={gallery[0]} alt={name} width="300px" />}
        </div>
        <div className="product-details-title">
          <h1>{brand}</h1>
          <h1>{name}</h1>
        </div>
        <div className="product-details-attributes-container">
          {attributes && (
            <ProductAttributes
              attributes={attributes}
              handleCart={this.handleCart.bind(this)}
            />
          )}
        </div>
        <div className="product-details-price-container">
          <h2>PRICE:</h2>
          <h2>{prices && `${price.currency.symbol}${price.amount}`}</h2>
        </div>
        <div className="div-details-cart-button-container">
          <AddToCartButton
            selectedAttributes={selectedAttributes}
            productDetails={productDetails}
          />
        </div>
        <div className="product-details-description-container">
          {/* removing the paragraph structure from the description element */}
          <p>{description && description.split(">")[1].split("<")[0]}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.currency,
});

export default connect(mapStateToProps)(ProductDetails);
