import React, {useState, useRef} from "react";
import MainCard from "./MainCard";
import { useNavigate, useNavigation } from "react-router";

const api = process.env.REACT_APP_API_URL;
const Login = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailError = useRef();
    const passwordError = useRef();

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`${api}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email, password }),
          });
    
          if (!response.ok) {
            console.log(response);
          }
          const result = await response.json();
          console.log(result);
          if (result.user) {
            localStorage.setItem("user", JSON.stringify(result.user));
            navigate("/");
          }
          if (result.error) {
            const value = emailError.current;
            value.textContent = result.error.email;
            value.style.color = "#D2122E";
            const pvalue = passwordError.current;
            pvalue.textContent = result.error.password;
            pvalue.style.color = "#D2122E";
          }
        } catch (error) {
          console.log("err");
          console.log(error.message);
        }
      };

      const navigateSignupHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            navigate("/signup");
        }, 1000)
      }
  return (
    <MainCard className={`mt-28`}>
      {loading ?  <div className="flex item-center justify-center fixed top-0 left-0 bg-[#2d2828] bg-opacity-30 w-full h-full">
          <article className="flex item-center justify-center m-auto">
            <span className="w-[48px] h-[48px] border-[5px] border-solid border-white border-b-[#1A73E8] rounded-[50%] inline-block animate-spin"></span>
          </article>
        </div> :   <div className={`flex items-center justify-center gap-10`}>
        <form
          className={`w-4/5 md:w-1/2 bg-[#3C4043] h-[450px] flex items-center justify-center flex-col rounded-2xl`}
          // ref={backRef}
          onSubmit={loginHandler}
        >
          <h1 className="font-bold text-center text-[18px] md:text-[24px] my-2 text-[#F9F9F9]">
            Login Form
          </h1>
          <div
            className="flex items-start m-auto justify-start gap-2 flex-col my-2 text-[#F9F9F9]
            "
          >
            <label>Email</label>
            <input
              type="email"
              placeholder="email"
              className="border-[1px] border-[#333]/0.4 text-black w-[180px] md:w-[300px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div ref={emailError}></div>
          </div>
          <div
            className="flex items-start m-auto justify-start gap-2 flex-col my-2 text-[#F9F9F9]
            "
          >
            <label>Password</label>
            <input
              type="password"
              placeholder="passsword"
              className="border-[1px] border-[#333]/0.4 text-black w-[180px] md:w-[300px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div ref={passwordError}></div>
          </div>
          <button className="my-4 bg-[#1A73E8] w-[120px] text-center py-2 rounded-lg text-white">
            Login
          </button>
          <button className="text-[#F9F9F9]" onClick={navigateSignupHandler}>haven't account ? signup</button>
        </form>
      </div>}
    </MainCard>
  );
};

export default Login;
