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
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
  MDBRow,
  MDBContainer,
  MDBCol,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";

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
            src="//media.gucci.com/content/HeroRegularStandard_3200x1350/1664272813/HeroRegularStandard_A-Reason-to-Love-01_001_Default.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3 className="perfumeXbig">WOMEN'S FRAGRANCES</h3>
            <p className="perfumeXsmall">
              Diverse expressions of self are celebrated through Authentic
              <br />
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
      <div className="vh-100" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="container py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <h1 className="uk-text-center">Tại sao chọn PerfumeX</h1>
            <MDBCol md="12" xl="4">
              <MDBCard style={{ borderRadius: "15px" }}>
                <MDBCardBody className="text-center">
                  <div className="mt-3 mb-4">
                    <MDBCardImage
                      src="https://xxivstore.com/wp-content/uploads/2021/01/grommet-icons_shield-security.svg"
                      fluid
                      style={{ width: "100px" }}
                    />
                  </div>
                  <MDBTypography tag="h4">Sản phẩm chính hãng</MDBTypography>
                  <MDBCardText className="text-muted mb-4">
                    Sản phẩm nước hoa được mua trực tiếp tại store ở pháp, cam
                    kết chính hãng
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="12" xl="4">
              <MDBCard style={{ borderRadius: "15px" }}>
                <MDBCardBody className="text-center">
                  <div className="mt-3 mb-4">
                    <MDBCardImage
                      src="https://xxivstore.com/wp-content/uploads/2021/02/free-ship.svg"
                      style={{ width: "200px" }}
                    />
                  </div>
                  <MDBTypography tag="h4">Freeship toàn quốc</MDBTypography>
                  <MDBCardText className="text-muted mb-4">
                    PerfumeX áp dụng freeship cho tất cả các khách hàng trên
                    toàn quốc với đơn hàng trên $100. Với những đơn hàng dưới $100, chúng tôi tính phí 30.000 VNĐ/đơn hàng
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="12" xl="4">
              <MDBCard style={{ borderRadius: "15px" }}>
                <MDBCardBody className="text-center">
                  <div className="mt-3 mb-4">
                    <MDBCardImage
                      src="https://xxivstore.com/wp-content/uploads/2021/02/gift.svg"
                      style={{ width: "150px" }}
                    />
                  </div>
                  <MDBTypography tag="h4">Thành viên thân thiết</MDBTypography>
                  <MDBCardText className="text-muted mb-4">
                    Thành viên vàng sẽ được giảm 5% / đơn hàng. Với thành viên
                    bạc khách được giảm 3% / đơn hàng
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <h1 className="uk-text-center">PerfumeX Store</h1>
            _______________________
            <div>
              <h5 className="uk-text-center">
                {" "}
                <i class="fa fa-map-marker" aria-hidden="true"></i> 115/5/9,
                đường Số 11, Trường Thọ, Thủ Đức, TP Hồ Chí Minh
              </h5>
              <h5 className="uk-text-center">
                {" "}
                <i class="fa fa-phone" aria-hidden="true"></i> 0854667913 |
                qhm.dev@gmail.com{" "}
              </h5>
            </div>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
}
export default HomeScreen;
