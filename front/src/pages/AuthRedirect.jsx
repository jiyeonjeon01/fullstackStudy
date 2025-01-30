import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuthToken = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get("code");

            if (!code) {
                alert("Authorization Code 없음!");
                navigate("/login"); // 실패 시 로그인 페이지로 이동
                return;
            }

            try {
                // ✅ GET 요청으로 변경
                const response = await axios.get("http://localhost:3000/auth/kakao", {
                    params: { code }
                });

                console.log("✅ [Kakao] 로그인 성공!", response.data);
                localStorage.setItem("token", response.data.token);

                alert("카카오 로그인 성공!");
                navigate("/"); // 메인 페이지로 이동
            } catch (error) {
                console.error("❌ [Kakao] 로그인 실패:", error.response?.data || error.message);
                alert("카카오 로그인 실패!");
                navigate("/login"); // 실패 시 로그인 페이지로 이동
            }
        };

        fetchAuthToken();
    }, [navigate]);

    return <div>로그인 중...</div>;
};

export default AuthRedirect;
