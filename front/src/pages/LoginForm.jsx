import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ 페이지 이동을 위해 추가
import axios from "axios";
import KakaoLoginBtn from "./KakaoLoginBtn";
import GoogleLoginBtn from "./GoogleLoginBtn";
import "../css/LoginForm.css";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();  // ✅ 페이지 이동을 위한 훅

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/login", {
                email,
                password
            });

            console.log("✅ 로그인 성공:", response.data);
            alert("로그인 성공!");

            // ✅ JWT 토큰 저장 (로그인 유지)
            localStorage.setItem("token", response.data.token);

            // ✅ 로그인 성공 후 "/success" 페이지로 이동!
            navigate("/success");
        } catch (error) {
            console.error("❌ 로그인 실패:", error.response?.data || error.message);
            alert("로그인 실패: " + (error.response?.data?.message || "서버 오류"));
        }
    };

    return (
        <div className="login-container">
            <h2>로그인</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="input-group">
                    <label htmlFor="email">이메일</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="이메일을 입력하세요"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="login-btn">로그인</button>
            </form>

            <div className="social-login">
                <p>또는</p>
                <KakaoLoginBtn />
                <GoogleLoginBtn />
            </div>
        </div>
    );
};

export default LoginForm;
