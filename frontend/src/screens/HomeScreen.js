//import data from "../data";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/esm/Button";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_ALL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>PerfumeX</title>
      </Helmet>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="//media.gucci.com/content/HeroRegularStandard_3200x1350/1547456404/HeroRegularStandard_GucciGuilty-Revolution-Homme-hero_001_Default.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 className="perfumeXbig">FRAGRANCES FOR HIM</h3>
            <p className="perfumeXsmall">
              Expressed through aromatic scents and unexpected blends of
              perfumes—men's fragrances are a celebration of freedom.
            </p>
            <Button href="/search?category=Men" variant="primary">
              SHOP NOW
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="//media.gucci.com/content/HeroRegularStandard_3200x1350/1664272813/HeroRegularStandard_A-Reason-to-Love-01_001_Default.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3 className="perfumeXbig">WOMEN'S FRAGRANCES</h3>
            <p className="perfumeXsmall">
              Diverse expressions of self are celebrated through Authentic
              <br/>
              perfumes for women with a refined blend of scents.
            </p>
            <Button href="/search?category=Women" variant="primary">
              SHOP NOW
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="//media.gucci.com/content/HeroRegularStandard_3200x1350/1550739604/HeroRegularStandard_BLOOM-GocceDiFiori-02_001_Default.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3 className="perfumeXbig">UNISEX'S FRAGRANCES</h3>
            <p className="perfumeXsmall">
              Diverse expressions of self are celebrated through Authentic
              perfumes for everyone with a refined blend of scents.
            </p>
            <Button href="/search?category=Unisex" variant="primary">
              SHOP NOW
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <h1 className="uk-text-center">Featured Products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
