import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import AuthRedirect from "../pages/AuthRedirect"; 

const Loading = <div>Loading...</div>;
const Main = lazy(() => import("../pages/MainPage"));
const About = lazy(() => import("../pages/AboutPage"));
const SignUp = lazy(() => import("../pages/SignUpForm"));
const KakaoLogin = lazy(() => import("../pages/KakaoLoginBtn"));
const GoogleLogin = lazy(() => import("../pages/GoogleLoginBtn"));
const Login = lazy(() => import("../pages/LoginForm"));
const LoginSuccess = lazy(() => import("../pages/LoginSuccess"));


function RootRoutes() {
  return (
    <Suspense fallback={Loading}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/kakaoLogin" element={<KakaoLogin />} />
        <Route path="/googleLogin" element={<GoogleLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/kakao" element={<AuthRedirect />} /> 
        <Route path="/loginSuccess" element={<LoginSuccess />} />
      </Routes>
    </Suspense>
  );
}

export default RootRoutes;
