import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { signin } from "../actions/userActions";

export default function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault(); // agr ye na lgaye to onsubmit default page to refresh kr deta hai and nya form create kr deta hai
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      <form className="form " onSubmit={submitHandler}>
        <div>
          <Link to="/" className="signlogo">
            <img src="/images/favicon.jpg" alt="logo" className="signlogo" />
          </Link>
        </div>
        <div>
          <h1 className="signin">Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary  " type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            <div className="divaboveregisterbutton ">New customer? </div>
            <div className="divaboveregisterbutton ">
              <Link to={`/register?redirect=${redirect}`} style={{textDecoration: 'underline'}} className="register">
                Create your IITocity account
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
