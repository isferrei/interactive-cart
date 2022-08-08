import React, { Component, Fragment } from "react";
import { Query, graphql, compose } from "react-apollo";
import productsQuery from "../CollectionShelf/queries/productsQuery.gql";
import Shelf from "./components/Shelf/index";
import { ExtensionPoint } from "vtex.render-runtime";
import "./MotoShelf.global.css";
import { Spinner } from "vtex.styleguide";

const cleanShelfVariable = shelfVariables => {
  if (!shelfVariables) {
    return shelfVariables
  }
  const { collection, category, from, to } = shelfVariables
  return {
    ...shelfVariables,
    ...(category != null ? {
      category: category.toString(),
    } : {}),
    ...(collection != null ? {
      collection: collection.toString(),
    } : {}),
    ...(from != null ? {
      from: parseInt(from),
    } : {}),
    ...(to != null ? {
      to: parseInt(to),
    } : {}),
  }
}

class MotoShelf extends Component {
  static schema = {
    title: "Shelf",
    description: "Shelf",
    type: "object",
    properties: {
      shelfTitle: {
        type: "string",
        title: "Shelf title"
      },
      shelfVariables: {
        type: "object",
        title: "Shelf variables",
        properties: {
          specificationFilters: {
            type: "string",
            title: "Specification filters"
          },
          orderBy: {
            type: "string",
            title: "OrderBy"
          },
          from: {
            type: "number",
            title: "From"
          },
          to: {
            type: "number",
            title: "To"
          },
          maxItems: {
            type: "number",
            title: "Max items"
          }
        }
      }
    }
  };

  render() {
    const { shelfTitle, shelfVariables } = this.props;

    return (
      <div className="container">
        <div className="collection-shelf">
          <div className="shelf-title">
            <h1>{shelfTitle}</h1>
          </div>
          <Query query={productsQuery} variables={cleanShelfVariable(shelfVariables)}>
            {({ loading, error, data }) => {
              if (loading)
                return (
                  <center>
                    <Spinner />
                  </center>
                );
              if (error) return <ExtensionPoint id="not-found" type="error" />;
              return <Shelf {...data} />;
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default MotoShelf;
