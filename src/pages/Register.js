import { useState, useEffect } from "react";
import { FormRow } from "../components";
import { toast } from "react-toastify";
// //this will be in context and reducer
// import { useDispatch, useSelector } from "react-redux";
// // this is for backend
// import { loginUser, registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUserContext } from "../context/user_context";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

function Register() {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();
  const {
    loginWithRedirect,
    registerUser,
    error,
    loading: isLoading,
    user,
  } = useUserContext();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please fill out all fields");
      return;
    }

    if (isMember) {
      loginWithRedirect(email, password);
      navigate("/");
      return;
    }

    if (password.length < 8) {
      toast.error("Password length must be greator then 8");
      return;
    }
    registerUser(values);
    navigate("/");
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  // useEffect(() => {
  //   if (user) {
  //     setTimeout(() => {
  //       navigate("/");
  //     }, 2000);
  //   }
  // }, [user]);
  return (
    <Wrapper className="page-100">
      <form className="form" onSubmit={onSubmit}>
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {/* name field */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {/* email field */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password field */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "loading..." : "submit"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?  " : "Already a member?  "}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .form {
    max-width: 400px;
    border-top: 5px solid var(--clr-primary-5);
  }

  .form:hover {
    box-shadow: var(--dark-shadow);
  }

  h3 {
    text-align: center;
    margin-bottom: 2rem;
  }

  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);

    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;
export default Register;
