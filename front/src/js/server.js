import express from "express";
import bodyParser from "body-parser";
import cors from "cors";


const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = []; // 간단한 메모리 저장 (실제 DB 연결 가능)

app.post("/api/signup", (req, res) => {
  const { email, password, zonecode, address } = req.body;
  users.push({ email, password, zonecode, address });
  console.log("저장된 회원정보:", users);
  res.status(201).json({ message: "회원가입 성공!" });
});

app.listen(5000, () => {
  console.log("서버 실행 중: http://localhost:5000");
});
