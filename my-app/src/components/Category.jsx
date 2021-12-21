import React, { Component } from "react";
import { client } from "..";
import { PRODUCTS_QUERY } from "../graphQL/queries";
import ProductCard from "./ProductCard";

export default class Category extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const path = window.location.pathname;
    const categoryName = path === "/" ? "all" : path.split("/")[1];

    client
      .query({
        query: PRODUCTS_QUERY,
        variables: { title: `${categoryName}` },
      })
      .then((result) =>
        this.setState({ products: result.data.category.products })
      );
  }

  render() {
    const { products } = this.state;
    return products.map(({ id, name, inStock, gallery, prices }) => {
      return (
        <ProductCard
          id={id}
          name={name}
          inStock={inStock}
          gallery={gallery}
          prices={prices}
        />
      );
    });
  }
}