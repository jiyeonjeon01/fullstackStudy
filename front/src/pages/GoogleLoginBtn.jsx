import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "../css/GoogleLoginBtn.css";

const clientId = "461913738960-s9u1nbu4nve43vo3u4r7dnun4er952on.apps.googleusercontent.com";

const GoogleLoginBtn = () => {
    // 로그인 성공 시 실행
    const onSuccess = async (response) => {
        console.log("📌 [Google] 로그인 성공!", response);

        try {
            const res = await axios.post("http://localhost:3000/auth/google", {
                id_token: response.credential  // Google에서 받은 토큰
            });

            console.log("✅ [Google] 백엔드 응답:", res.data);
            alert("Google 로그인 성공!");

            // ✅ JWT 토큰 저장 (로그인 유지)
            localStorage.setItem("google_token", res.data.token);
        } catch (err) {
            console.error("❌ [Google] 로그인 실패:", err);
            alert("Google 로그인 실패!");
        }
    };

    // 로그인 실패 시 실행
    const onFailure = () => {
        console.error("❌ [Google] 로그인 실패");
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={onSuccess}  // 로그인 성공 시 
                onError={onFailure}    // 로그인 실패 시 
                theme="outline"
                size="large"
                shape="rectangular"
                text="signin_with"
                width="500"
                className="google-login-btn"
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginBtn;
