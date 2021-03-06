import PropTypes from "prop-types"
import React, { Component } from "react";
import { addToCartAction, removeFromCartAction } from "../redux/actions";
import { connect } from "react-redux";

class CartQuantityHandler extends Component {
  render() {
    const {
      quantity,
      productDetails,
      selectedAttributes,
      addToCart,
      removeFromCart,
    } = this.props;
    return (
      <>
        <button
          onClick={() =>
            addToCart({
              selectedAttributes,
              productDetails,
            })
          }
        >
          +
        </button>
        <span className="cart-item-quantity">{quantity}</span>
        <button
          onClick={() =>
            removeFromCart({
              selectedAttributes,
              productDetails,
            })
          }
        >
          -
        </button>
      </>
    );
  }
}

CartQuantityHandler.propTypes = {
  addToCart: PropTypes.func,
  productDetails: PropTypes.object,
  quantity: PropTypes.number,
  removeFromCart: PropTypes.func,
  selectedAttributes: PropTypes.object
}

const mapDispatchToProps = (dispatch) => ({
  addToCart: (product) => dispatch(addToCartAction(product)),
  removeFromCart: (product) => dispatch(removeFromCartAction(product)),
});

export default connect(null, mapDispatchToProps)(CartQuantityHandler);
