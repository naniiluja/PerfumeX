import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import Button from 'react-bootstrap/Button';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ChatBot from './components/ChatBot';
import MapScreen from './screens/MapScreen';
import {
  CDBFooter,
  CDBBox,
  CDBBtn,
  CDBIcon,
  CDBNavbar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
} from 'cdbreact';
import SrollToTop from './components/SrollToTop';
import AboutScreen from './screens/AboutScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;
  const bgBlack = { backgroundColor: '#000000', color: '#f4f4f4' };
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
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
      <ChatBot />
      <div
        className={
          sidebarIsOpen
            ? fullBox
              ? 'site-container active-cont d-flex flex-column full-box'
              : 'site-container active-cont d-flex flex-column'
            : fullBox
            ? 'site-container d-flex flex-column full-box'
            : 'site-container d-flex flex-column'
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header style={{ marginBottom: '20px' }}>
          <CDBNavbar style={bgBlack} dark expand="md" scrolling>
            <Button
              style={{ marginLeft: '100px' }}
              variant="dark"
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            >
              <img
                alt="logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Android_O_Preview_Logo.png/1024px-Android_O_Preview_Logo.png"
                width="30px"
              />
            </Button>
            <Container style={{ marginLeft: '-10px' }}>
              <LinkContainer to="/">
                <Navbar.Brand
                  className="perfumeX"
                  onClick={() => setSidebarIsOpen(false)}
                >
                  PerfumeX
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="me-auto  w-100  justify-content-end">
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer
                        to="/profile"
                        onClick={() => setSidebarIsOpen(false)}
                      >
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer
                        to="/orderhistory"
                        onClick={() => setSidebarIsOpen(false)}
                      >
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
                    <CDBBtn color="white" style={{ padding: '0px 10px' }}>
                      <Link
                        className="nav-link"
                        to="/signin"
                        style={{ color: '#000', width: '80px' }}
                      >
                        Sign In
                      </Link>
                    </CDBBtn>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Administrator" id="admin-nav-dropdown">
                      <LinkContainer
                        to="/admin/dashboard"
                        onClick={() => setSidebarIsOpen(false)}
                      >
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer
                        to="/admin/products"
                        onClick={() => setSidebarIsOpen(false)}
                      >
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer
                        to="/admin/orders"
                        onClick={() => setSidebarIsOpen(false)}
                      >
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer
                        to="/admin/users"
                        onClick={() => setSidebarIsOpen(false)}
                      >
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                  <Link to="/cart" className="nav-link">
                    <CDBBtn circle color="dark" style={{ padding: 0 }}>
                      <i class="fa-solid fa-cart-shopping"></i>
                      {cart.cartItems.length > 0 && (
                        <Badge pill bg="danger">
                          {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                        </Badge>
                      )}
                    </CDBBtn>
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </CDBNavbar>
        </header>
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <CDBSidebarHeader>Categories</CDBSidebarHeader>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={`/search?category=${category}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <CDBSidebarMenuItem
                    icon="fas fa-angle-right"
                    className="navlinka"
                  >
                    {category}
                  </CDBSidebarMenuItem>
                </LinkContainer>
              </Nav.Item>
            ))}
            <Nav.Item>
              <LinkContainer
                to="/about"
                onClick={() => setSidebarIsOpen(false)}
              >
                <CDBSidebarMenuItem
                  icon="fas fa-angle-right"
                  className="navlinka"
                >
                  About
                </CDBSidebarMenuItem>
              </LinkContainer>
            </Nav.Item>
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
              <Route
                path="/map"
                element={
                  <ProtectedRoute>
                    <MapScreen />
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
              <Route path="/about" element={<AboutScreen />}></Route>

              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
          <SrollToTop />
        </main>
        <footer>
          <CDBFooter className="shadow">
            <CDBBox
              display="flex"
              justifyContent="between"
              alignItems="center"
              className="mx-auto py-4 flex-wrap"
              style={{ width: '80%' }}
            >
              <CDBBox display="flex" alignItems="center">
                <a href="/" className="d-flex align-items-center p-0 text-dark">
                  <img
                    alt="logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Android_O_Preview_Logo.png/1024px-Android_O_Preview_Logo.png"
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
