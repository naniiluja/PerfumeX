import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Store } from "./Store";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Button from "react-bootstrap/Button";
import { getError } from "./utils";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardScreen from "./screens/DashboardScreen";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import { CDBFooter, CDBBox, CDBBtn, CDBIcon, CDBContainer } from "cdbreact";
import SrollToTop from "./components/SrollToTop";
function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? "d-flex flex-column site-container active-cont"
            : "d-flex flex-column site-container"
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header style={{ marginBottom: "20px" }}>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Button
              style={{ marginLeft: "100px" }}
              variant="dark"
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            >
              <i className="fas fa-bars"></i>
            </Button>
            <Container style={{ marginLeft: "-10px" }}>
              <LinkContainer to="/">
                <Navbar.Brand>PerfumeX</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="me-auto  w-100  justify-content-end">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div
          className={
            sidebarIsOpen
              ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
              : "side-navbar d-flex justify-content-between flex-wrap flex-column"
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <h3>Categories</h3>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={`/search?category=${category}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link className="navlinka">{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main>
          <Container>
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
              <Route path="/payment" element={<PaymentMethodScreen />}></Route>
              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              ></Route>

              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
          <SrollToTop/>
        </main>
        <footer>
          <CDBFooter className="shadow">
            <CDBBox
              display="flex"
              justifyContent="between"
              alignItems="center"
              className="mx-auto py-4 flex-wrap"
              style={{ width: "80%" }}
            >
              <CDBBox display="flex" alignItems="center">
                <a href="/" className="d-flex align-items-center p-0 text-dark">
                  <img
                    alt="logo"
                    src="data:image/png;base64,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"
                    width="30px"
                  />
                  <span className="ml-4 h5 mb-0 font-weight-bold">
                  PerfumeX
                  </span>
                </a>
              </CDBBox>
              <CDBBox>
                <small className="ml-2">
                  &copy; PerfumeX, 2022. All rights reserved.
                </small>
              </CDBBox>
              <CDBBox display="flex">
                <CDBBtn flat color="dark" className="p-2">
                  <CDBIcon fab icon="facebook-f" />
                </CDBBtn>
                <CDBBtn flat color="dark" className="mx-3 p-2">
                  <CDBIcon fab icon="twitter" />
                </CDBBtn>
                <CDBBtn flat color="dark" className="p-2">
                  <CDBIcon fab icon="instagram" />
                </CDBBtn>
              </CDBBox>
            </CDBBox>
          </CDBFooter>
        </footer>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
