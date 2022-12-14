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
              Kh??a c???nh ?????c ????o c???a b???n th??n, c??ng nh?? s??? quy???n r?? c???a ph??i n???
              <br />
              ???????c t??n vinh l??n b???i s??? pha tr???n ?????c ????o v?? tinh t??? c???a c??c m??i h????ng...
            </p>
            <Button href="/search?category=Women" variant="primary">
            KH??M PH?? NGAY
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
              Th??? hi???n qua h????ng th??m v?? s??? pha tr???n ?????c ????o c???a c??c m??i h????ng - <br />t??n vinh l??n s??? t??? do c???a n?????c hoa nam.
            </p>
            <Button href="/search?category=Men" variant="primary">
              KH??M PH?? NGAY
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
              Nh???ng kh??a c???nh kh??c c???a b???n th??n ???????c t??n l??n qua lo???i n?????c hoa d??nh cho m???i ng?????i v???i s??? ho?? tr???n tinh t??? c???a c??c m??i h????ng...
            </p>
            <Button href="/search?category=Unisex" variant="primary">
            KH??M PH?? NGAY
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <h1 className="uk-text-center">S???N PH???M N???I B???T</h1>
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
            <h1 className="uk-text-center">T???i sao ch???n PerfumeX</h1>
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
                  <MDBTypography tag="h4">S???n ph???m ch??nh h??ng</MDBTypography>
                  <MDBCardText className="text-muted mb-4">
                    S???n ph???m n?????c hoa ???????c mua tr???c ti???p t???i store ??? ph??p, cam
                    k???t ch??nh h??ng
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
                  <MDBTypography tag="h4">Freeship to??n qu???c</MDBTypography>
                  <MDBCardText className="text-muted mb-4">
                    PerfumeX ??p d???ng freeship cho t???t c??? c??c kh??ch h??ng tr??n
                    to??n qu???c v???i ????n h??ng tr??n $100. V???i nh???ng ????n h??ng d?????i $100, ch??ng t??i t??nh ph?? 30.000 VN??/????n h??ng
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
                  <MDBTypography tag="h4">Th??nh vi??n th??n thi???t</MDBTypography>
                  <MDBCardText className="text-muted mb-4">
                    Th??nh vi??n v??ng s??? ???????c gi???m 5% / ????n h??ng. V???i th??nh vi??n
                    b???c kh??ch ???????c gi???m 3% / ????n h??ng
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
                ???????ng S??? 11, Tr?????ng Th???, Th??? ?????c, TP H??? Ch?? Minh
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
