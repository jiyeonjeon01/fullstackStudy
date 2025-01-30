import React from "react";
import "../css/KakaoLoginBtn.css";

const KAKAO_CLIENT_ID = "e1f580827a6c5e6b1a1fc6ae9f79a1c8";
const KAKAO_REDIRECT_URI = "http://localhost:5173/auth/kakao"; // ✅ 수정됨

const KakaoLoginBtn = () => {
    const handleLogin = () => {
        const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

        console.log("📌 [Kakao] 로그인 URL:", kakaoURL); 
        window.location.href = kakaoURL;
    };

    return (
        <button onClick={handleLogin} className="kakao-login-btn">
            카카오 로그인
        </button>
    );
};

export default KakaoLoginBtn;
