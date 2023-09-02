import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
// React is the object and 'react' is the module
import "./index.css";
import { useDispatch } from 'react-redux';
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import SigninScreen from "./screens/SigninScreen";
import { signout } from "./actions/userActions";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAdressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
 const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="bgcolor row ">
          <div>
            <Link to="/" className="heading brand">
              IITocity-subhash
            </Link>
          </div>
          <div>
            
            <Link to="/cart">
              <img src="/images/cartimage.png" alt="" id="cartlogo" />
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                      <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link  to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            
          </div>
        </header>
        <main>
          {/* in first route question mark is added as id is optional if id is not provided by the user then it should take him to the cart  */}
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          
          <PrivateRoute path="/profile"component={ProfileScreen}></PrivateRoute>
          <Route path="/" component={HomeScreen} exact></Route>
          
          
        </main>
        <footer className="bgcolor row center">
          <div className="itemfooter">
            <a href="about.html">About us</a>
          </div>
          <div className="itemfooter">
            <a href="contact.html">Contact us</a>
          </div>
          <div className="itemfooter col">All right reserved.</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
