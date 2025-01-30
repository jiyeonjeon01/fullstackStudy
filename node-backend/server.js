import express from "express";
import cors from "cors";
import axios from "axios";
import oracledb from "oracledb";
import dotenv from "dotenv";

dotenv.config(); // ✅ .env 파일 불러오기

const app = express();
app.use(express.json());

// ✅ CORS 설정 (React 5173 포트 허용)
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// ✅ OracleDB 설정
const dbConfig = {
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectString: process.env.ORACLE_CONNECTION
};

// ✅ Google OAuth 설정
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = "http://localhost:5173/auth/google"; // ✅ 수정

// ✅ Kakao OAuth 설정
const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID; 
const KAKAO_REDIRECT_URI = "http://localhost:5173/auth/kakao";

// ✅ Google OAuth 토큰 교환 + OracleDB 저장
app.post("/auth/google", async (req, res) => {
    console.log("📌 [Google] 백엔드 요청 도착!");
    const { id_token } = req.body;

    if (!id_token) {
        console.log("❌ [Google] ID 토큰 없음!");
        return res.status(400).json({ message: "ID 토큰 없음" });
    }

    try {
        // ✅ Google 토큰 검증 및 사용자 정보 가져오기
        const userInfoResponse = await axios.get("https://oauth2.googleapis.com/tokeninfo", {
            params: { id_token }
        });

        const { sub, email, name, picture } = userInfoResponse.data;

        console.log("✅ [Google] 로그인 성공:", userInfoResponse.data);

        // ✅ OracleDB에 유저 저장 (중복 체크 후 삽입)
        const connection = await oracledb.getConnection(dbConfig);

        // 기존 유저 확인
        let result = await connection.execute(
            `SELECT GOOGLE_ID FROM GOOGLE_USER WHERE GOOGLE_ID = :sub`,
            { sub }
        );

        if (result.rows.length === 0) {
            await connection.execute(
                `INSERT INTO GOOGLE_USER (GOOGLE_ID, USER_EMAIL, USER_NAME, SYSFILE, ORIGINFILE, ROLE_ID, USER_REGDATE)
                 VALUES (:sub, :email, :name, :picture, :picture, 1, SYSDATE)`,
                { sub, email, name, picture },
                { autoCommit: true }
            );
            console.log("✅ [Google] 새 유저 저장 완료!");
        } else {
            console.log("✅ [Google] 이미 가입된 유저");
        }

        await connection.close();
        res.status(200).json({ token: id_token, user: userInfoResponse.data });
    } catch (error) {
        console.error("❌ [Google] 로그인 실패:", error.response?.data || error.message);
        res.status(500).json({ message: "Google 로그인 실패" });
    }
});


/// ✅ Kakao OAuth 토큰 교환 + OracleDB 저장
app.get("/auth/kakao", async (req, res) => {  // ✅ GET 요청 방식 유지
    console.log("📌 [Kakao] GET /auth/kakao 요청 도착!", req.query);
    const { code } = req.query;

    if (!code) return res.status(400).json({ message: "Authorization Code 없음" });

    try {
        // ✅ 액세스 토큰 요청
        const tokenResponse = await axios.post("https://kauth.kakao.com/oauth/token", null, {
            params: {
                grant_type: "authorization_code",
                client_id: KAKAO_CLIENT_ID,
                redirect_uri: KAKAO_REDIRECT_URI, // ✅ 여기 수정
                code
            },
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });

        const { access_token } = tokenResponse.data;

        // ✅ 카카오 사용자 정보 요청
        const userInfoResponse = await axios.get("https://kapi.kakao.com/v2/user/me", {
            headers: { Authorization: `Bearer ${access_token}` }
        });

        const { id, kakao_account } = userInfoResponse.data;
        const email = kakao_account.email || `${id}@kakao.com`; // 이메일이 없을 경우 가짜 이메일 생성
        const name = kakao_account.profile.nickname;
        const profileImage = kakao_account.profile.profile_image_url;
        const thumbnailImage = kakao_account.profile.thumbnail_image_url;

        console.log("✅ [Kakao] 로그인 성공!", { id, email, name, profileImage });

        // ✅ OracleDB에 유저 저장 (중복 체크 후 삽입)
        const connection = await oracledb.getConnection(dbConfig);

        // 기존 유저 확인
        let result = await connection.execute(
            `SELECT KAKAO_ID FROM KAKAO_USER WHERE KAKAO_ID = :kakao_id`,
            { kakao_id: id }
        );

        console.log("📌 [DB] 기존 유저 조회 결과:", result.rows);

        if (result.rows.length === 0) {
            console.log("✅ [DB] 새 유저 삽입 중...");
            await connection.execute(
                `INSERT INTO KAKAO_USER (KAKAO_ID, USER_EMAIL, USER_NAME, SYS_FILE, ORIGIN_FILE, ROLE_ID, USER_REGDATE) 
                 VALUES (:kakao_id, :email, :user_name, :sys_file, :origin_file, 1, SYSDATE)`, 
                {
                    kakao_id: id,
                    email,
                    user_name: name,
                    sys_file: profileImage,
                    origin_file: thumbnailImage 
                },
                { autoCommit: true }
            );
            
            console.log("✅ [DB] 새 유저 저장 완료!");
        } else {
            console.log("✅ [DB] 이미 가입된 유저");
        }

        await connection.close();
        res.status(200).json({ token: access_token, user: userInfoResponse.data });
    } catch (error) {
        console.error("❌ [Kakao] 로그인 실패:", error.response?.data || error.message);
        res.status(500).json({ message: "Kakao 로그인 실패", error: error.message });
    }
});



// ✅ 3000 포트에서 백엔드 실행
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`백엔드 실행 http://localhost:${PORT}`);
});
