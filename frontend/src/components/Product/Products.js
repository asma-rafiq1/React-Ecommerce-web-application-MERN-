import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { clearErrors, getProducts } from "../../actions/productActions";
import ProductCard from "../Home/ProductCard";
import "./Products.css";
import { useSearchParams, useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import PCard from "../Home/pCard";

const categories = ["Dress", "Shoes", "Bag", "Phone", "Camera"];

const Products = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rating, setRating] = React.useState(0);
  const [price, setPrice] = React.useState([0, 1000]);
  const [category, setCategory] = React.useState("");

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    error,
    products,
    loading,
    productsCount,
    resultsPerPage,
    filteredProductCount,
  } = useSelector((state) => state.products);

  console.log(products);

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  let key = "";
  if (keyword) {
    key = keyword;
  }

  useEffect(() => {
    console.log(category);
    dispatch(getProducts(key, currentPage, price, category, rating));
  }, [dispatch, key, currentPage, price, category, rating]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Products"} />
          <div className="containerBoxx">
            <div className="rightpart">
              <p className="product-heading">Products</p>

              <div className="rightpartselectors">
                <div>Popular First</div>
                <div>CHEAPEST First</div>
                <div>nEWEST First</div>
                <div>DISCOUNT First</div>
              </div>

              <div className="products-list">
                {products &&
                  products.map((item, i) => {
                    return <PCard key={i} product={item} />;
                  })}
              </div>

              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultsPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  lastPageText="Last"
                  prevPageText="Prev"
                  firstPageText="1st"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageitemactive"
                  activeLinkClass="pagelinkActive"
                />
              </div>
            </div>

            <div className="leftpart">
              <div className="filterbox">
                <div>
                  <Typography>Price</Typography>
                  <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    max={1000}
                    min={0}
                  />
                </div>
                <div>
                  <Typography>Categories</Typography>
                  <ul>
                    {categories.map((categor, i) => {
                      return (
                        <li
                          key={categor}
                          className="category-list"
                          onClick={() => setCategory(categor)}
                        >
                          {categor}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <fieldset>
                    <Typography component="legend">Rating Above</Typography>
                    <Slider
                      value={rating}
                      onChange={(event, newRating) => setRating(newRating)}
                      valueLabelDisplay="on"
                      aria-labelledby="continous-slider"
                      max={5}
                      min={0}
                      color="#000"
                    />
                  </fieldset>
                </div>
              </div>
            </div>
            {/* {resultsPerPage < filteredProductCount && ( */}

            {/* )} */}
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Products;
