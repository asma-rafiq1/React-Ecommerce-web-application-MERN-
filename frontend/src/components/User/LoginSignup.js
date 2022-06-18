import React, { Fragment, useState, useRef, useEffect } from "react";
import "./LoginSignup.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { login, registerUser } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CLEAR_ERRORS } from "../../constants/productConstants";
import profile from "../../assets/profile.jpeg";
import MetaData from "../layout/MetaData";

const LoginSignup = () => {
  const [loginEmail, setLoginEmail] = useState();
  const [loginPassword, setLoginPassword] = useState();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isAuthenticated, userd, error } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [file, setfile] = useState();

  const switcherTab = useRef(null);
  const loginTab = useRef(null);
  const registerTab = useRef(null);

  const [openLogin, setOpenLogin] = useState(true);

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(profile);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("left-side");
      switcherTab.current.classList.remove("right-side");
      setOpenLogin(true);
    }
    if (tab === "register") {
      switcherTab.current.classList.add("right-side");
      switcherTab.current.classList.remove("left-side");

      setOpenLogin(false);
    }
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      setfile(e.target.files[0]);
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          console.log(reader.result);
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const [passError, setpassError] = useState();
  const [nameError, setnameError] = useState();
  const [imageError, setimageError] = useState();
  const registerSubmit = (e) => {
    e.preventDefault();

    if (name.length <= 4) {
      setnameError("Name must be greater than 4 characters");
      return;
    }

    if (password.length <= 8) {
      setpassError("Password must be longer than 8 characters");
      return;
    }

    if (!avatar) {
      setimageError("Please choose your profile image");
      return;
    }
    // const form =new FormData();
    //  form.set('name',name);
    //  form.set('email',email);
    //  form.set('password',password);
    //  form.set('image',file);

    const myForm = {
      name: name,
      email: email,
      password: password,
      avatar: avatar,
    };

    dispatch(registerUser(myForm));
  };

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (nameError || passError || imageError) {
      setTimeout(() => {
        setnameError("");
        setpassError("");
        setimageError("");
      }, 3000);
    }

    if (error) {
      dispatch(CLEAR_ERRORS());
    }
  }, [isAuthenticated, nameError, passError, error]);

  return (
    <Fragment>
      <MetaData title={"Sign Up"} />
      <div className="parent-container">
        <div className="first-child-container">
          <div className="tab-parent">
            <div className="tab-link">
              <p onClick={(e) => switchTabs(e, "login")}>Login</p>
              <p onClick={(e) => switchTabs(e, "register")}>Register</p>
            </div>
            <button className="tab-underline" ref={switcherTab}></button>
          </div>

          <div>
            {openLogin && (
              <form onSubmit={submitForm} ref={loginTab} className="form">
                <div className="icon-input">
                  <MailOutlineIcon className="icon" />
                  <input
                    autoFocus
                    value={loginEmail}
                    required
                    placeholder="Email"
                    onChange={(e) => setLoginEmail(e.target.value)}
                    type="email"
                  />
                </div>
                <div className="icon-input">
                  <LockOpenIcon className="icon" />
                  <input
                    value={loginPassword}
                    required
                    placeholder="Password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                    type="password"
                  />
                </div>
                <a>Forget password?</a>
                <button type="submit">Login</button>
              </form>
            )}

            {!openLogin && (
              <form
                onSubmit={registerSubmit}
                className="form"
                ref={registerTab}
                encTyp="multipart/form-data"
              >
                <div className="icon-input">
                  <FaceIcon className="icon" />
                  <input
                    autoFocus
                    value={name}
                    name="name"
                    required
                    placeholder="Name"
                    onChange={registerDataChange}
                  />
                  {nameError && <p className="error">{nameError}</p>}
                </div>
                <div className="icon-input">
                  <MailOutlineIcon className="icon" />
                  <input
                    value={email}
                    name="email"
                    required
                    placeholder="Email"
                    onChange={registerDataChange}
                    type="email"
                  />
                </div>
                <div className="icon-input">
                  <LockOpenIcon className="icon" />
                  <input
                    value={password}
                    name="password"
                    required
                    placeholder="Password"
                    onChange={registerDataChange}
                    type="password"
                  />
                  {passError && <p className="error">{passError}</p>}
                </div>
                <div className="image-preview">
                  <img src={avatarPreview} />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                  {imageError && <p className="error">{imageError}</p>}
                </div>

                {error && <p className="error">{error}</p>}

                <button type="submit">Register</button>
              </form>
            )}
          </div>

          <div></div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginSignup;
