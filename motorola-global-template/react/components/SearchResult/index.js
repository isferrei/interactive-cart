import { useEffect, Component, Fragment, useState } from "react";
import { withApollo } from "react-apollo";
import searchQuery from "./queries/search.gql";
import { Spinner } from "vtex.styleguide";
import { ExtensionPoint } from "vtex.render-runtime";
import "./SearchResult.global.css";
import { FormattedMessage } from "react-intl";

const SearchResult = props => {
  const [products, setProducts] = useState([]);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(8);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchParams, setSearchParams] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (searchParams !== props.params) {
      clearState();
      //console.log('searchParams, props.query',searchParams, props.query, props)
      setSearchParams(props.params);
    }
  }, [props.params]);

  useEffect(() => {
    getProducts();
  }, [searchParams])

  const clearState = () => {
    setProducts([]);
    setFrom(0);
    setTo(8);
  };

  const getProducts = async () => {
    setLoading(true);
    await requestProducts();
    setLoading(false);
  };

  const requestProducts = async (newFrom, newTo) => {
    let map = [];

    if (props.params.map) {
      map.push(props.params.map);
    } else {
      map.push("ft");
    }
    //console.log('props.params', props.params)
    const query = props.params.term;

    const variables = {
      query: query,
      map: map.join(","),
      from: newFrom || from,
      to: newTo || to
    };

    const { client } = props;
    try {
      const response = (
        await client.query({
          query: searchQuery,
          variables
        })
      ).data;
      //console.log('variables', variables);
      setTotal(response.search.recordsFiltered);
      //console.log("products", response);
      setProducts([...products, ...response.search.products]);
      //console.log([...products, ...response.search.products]);

    } catch (error) {
      console.error(error);
    }
  };

  const loadMore = async () => {
    setLoadingMore(true);
    let perPage = 9;
    let newFrom = from + perPage;
    let newTo = to + perPage;
    setFrom(newFrom);
    setTo(newTo);
    await requestProducts(newFrom, newTo);
    setLoadingMore(false);
  };

  if (loading) {
    return (
      <div className="search-result">
        <div className="container">
          <center>
            <Spinner />
          </center>
        </div>
      </div>
    );
  }

  if (!loading && !products.length) {
    return <ExtensionPoint id="not-found" type="search" />;
  }

  return (
    <div className="search-result">
      <div className="container">
        <div className="product-list">
          {products.map((product, key) => (
            <Fragment key={key}>
              <ExtensionPoint
                id="moto-product-summary"
                key={key + "-0"}
                {...product}
              />
              <ExtensionPoint
                id="moto-product-block"
                key={key + "-1"}
                {...product}
              />
            </Fragment>
          ))}
        </div>
        {total > products.length ? (
          <button
            disabled={loadingMore}
            onClick={loadMore}
            className="load-more-button"
          >
            <FormattedMessage id="store/search-result.load-more" />
            {loadingMore && <Spinner color="white" />}
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default withApollo(SearchResult);
