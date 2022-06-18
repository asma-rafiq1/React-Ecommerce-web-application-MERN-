import React, { Fragment, useEffect, useState, useRef } from "react";
import { getProducts } from "../../actions/productActions";
import Loader from "../layout/Loader/Loader";
import "./Home.css";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
// import { clearErrors } from '../../actions/productActions';
import coverImage from "../../images/coverImage.PNG";
import noshop from "../../images/noshop.png";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import {
  MdLocalShipping,
  MdSearch,
  MdCreditCard,
  MdOutlineHeadsetMic,
  MdAssignmentReturn,
  MdOutlineLocalFireDepartment,
} from "react-icons/md";

import { FaShoppingCart } from "react-icons/fa";
import CustomerServiceCard from "./CustomerServiceCard";
import { Link } from "react-router-dom";
import PCard from "./pCard";
import SearchItem from "./Search";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Home = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const categories = ["Dress", "Shoes", "Bag", "Phone", "Camera"];

  const images = [
    "https://graphicsfamily.com/wp-content/uploads/edd/2021/07/Professional-E-Commerce-Shoes-Banner-Design.jpg",
    coverImage,
    "https://i.ytimg.com/vi/qpx6SPjSVhs/maxresdefault.jpg",
  ];
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, products, loading } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated, userd } = useSelector((state) => state.user);
  const [newProducts, setnewProducts] = useState([]);

  let seeAllLess = useRef();

  const seeAll = () => {
    if (seeAllLess.current.textContent === "SEE LESS") {
      seeAllLess.current.textContent = "SEE ALL";
      setnewProducts(products.slice(0, 4));
    } else {
      seeAllLess.current.textContent = "SEE LESS";
      setnewProducts(products);
    }
  };

  useEffect(() => {
    //     if(error){
    //     alert.error(error)
    //     dispatch(clearErrors())
    //     }

    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (products && newProducts.length === 0) {
      setnewProducts(products.slice(0, 4));
    }
  }, [products]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="parent">
          <MetaData title="No Shop Home" />
          <header>
            <div className="topHeader">
              <img className="logoC" src={noshop} />
              <SearchItem />
              <div className="topHeadRightSelectors">
                {isAuthenticated ? (
                  <Link className="link" to="/">
                    {userd.name}
                  </Link>
                ) : (
                  <Link className="link" to="/login">
                    Sign Up
                  </Link>
                )}

                <Link to={"/cart"}>
                  <div className="cartLength">{cartItems.length}</div>
                  <FaShoppingCart size={25} color={"#000"} />
                </Link>
              </div>
            </div>
            <div className="bottomHeader">
              <div className="BotHeadCategories">
                {categories.map((i) => {
                  return (
                    <Link className="link" to={`/products?keyword=${i}`}>
                      <p>{i}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </header>

          {/* <div id="homeCoverImage" >
            <img src={coverImage} id="homeCoverImage" />
          </div> */}

          <Carousel autoPlay responsive={responsive}>
            {images && images.map((i) => <img src={i} id="homeCoverImage" />)}
          </Carousel>

          <div className="customerSupport">
            <CustomerServiceCard
              title="Free Delivery"
              des="Get free delivery to every order ablove $20"
              icon={<MdLocalShipping color="#FEBB23" size={20} />}
            />
            <CustomerServiceCard
              title="90 Days Return"
              des="Return within 90 days of receiving your order"
              icon={<MdAssignmentReturn color="#FEBB23" size={20} />}
            />
            <CustomerServiceCard
              title="Secure Payment"
              des="100% secure payment"
              icon={<MdCreditCard color="#FEBB23" size={20} />}
            />
            <CustomerServiceCard
              title="24/7 Online Support"
              des="Dedicated support anytime and anywhere"
              icon={<MdOutlineHeadsetMic color="#FEBB23" size={20} />}
            />
          </div>

          <div className="firstHomeProdLine">
            <div className="firstHomeProdLineTitle">
              <MdOutlineLocalFireDepartment color="#FEBB23" size={40} />
              <p className="hot">Hot Deals</p>
              <hr className="firsthr"></hr>
              <p className="gray">Top 10</p>
              <hr className="secondhr"></hr>
              <div onClick={seeAll} className="box" ref={seeAllLess}>
                SEE ALL
              </div>
            </div>

            <div className="flexcards">
              {newProducts &&
                newProducts.map((product, i) => {
                  return <PCard product={product} key={i} />;
                })}
            </div>
          </div>

          {/* <main className='secondcontainer'>
                <div className='secondcontheading'>
            <h2>Featured Products</h2>
            <hr></hr>
            </div>

            <div className='container'>
                {products.map((product)=>(
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>

            </main> */}
        </div>
      )}
    </>
  );
};

export default Home;
