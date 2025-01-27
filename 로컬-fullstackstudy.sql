-- Member 테이블 생성
CREATE TABLE Member (
    email VARCHAR2(100) PRIMARY KEY,  -- 이메일을 PK로 설정
    pw VARCHAR2(255) NOT NULL,         -- 비밀번호
    nickname VARCHAR2(100),            -- 닉네임
    social CHAR(1) CHECK (social IN ('Y', 'N')) -- 소셜 여부 (Y/N)
);

-- MemberRole 테이블 생성 (ElementCollection으로 1:N 관계)
CREATE TABLE MemberRole (
    id NUMBER GENERATED ALWAYS AS IDENTITY, -- 자동 증가 ID
    member_email VARCHAR2(100) NOT NULL,    -- Member 테이블의 외래 키
    user_role VARCHAR2(50),                  -- 사용자 역할
    manager_role VARCHAR2(50),               -- 관리자 역할
    admin_role VARCHAR2(50),                  -- 관리자 역할
    CONSTRAINT fk_member FOREIGN KEY (member_email) REFERENCES Member(email) ON DELETE CASCADE
);

-- 유저 역할 테이블 (Role)
CREATE TABLE Role (
    role_id NUMBER PRIMARY KEY,      -- 유저 역할 식별자
    role_name VARCHAR2(50) UNIQUE NOT NULL -- 역할 이름
);

-- 유저 테이블 (User)
CREATE TABLE Users (
    users_id NUMBER PRIMARY KEY,            -- 유저 식별자
    email VARCHAR2(50) UNIQUE NOT NULL,     -- 이메일 (로그인 ID)
    password VARCHAR2(100) NOT NULL,        -- 비밀번호
    users_name VARCHAR2(20) NOT NULL,        -- 이름
    birth NUMBER NOT NULL,                  -- 생년월일
    gender CHAR(1) CHECK (gender IN ('M', 'F')) NOT NULL, -- 성별
    phone VARCHAR2(15) NOT NULL,             -- 전화번호
    postcode VARCHAR2(10) NOT NULL,          -- 우편번호 (다음 API에서 제공)
    road_address VARCHAR2(255) NOT NULL,     -- 도로명 주소
    jibun_address VARCHAR2(255),             -- 지번 주소 (옵션)
    detail_address VARCHAR2(100),            -- 상세주소
    extra_address VARCHAR2(100),             -- 참고사항 (빌딩명 등)
    users_regdate DATE DEFAULT SYSDATE        -- 가입일자 (기본값: 현재시간)
);
