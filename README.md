# 👨‍💻 TeaTime
- 차 전문 브랜드 [오설록](https://www.osulloc.com/kr/ko) 클론 프로젝트
- 사이트의 내부 기능을 분석하여 API 구현 

<br/>

## 💼 기간
- 개발기간 : 2023/09/18 ~ 2023/10/06 (총 2주, 추석제외)

<br/>

## :satisfied: BE 개발 인원
<table border>
  <tbody>
    <tr>
      <td align="center" width="200px">
        <center>PM</center><br>
        <a href="https://github.com/handyman-sodo">
          <img src="https://img.shields.io/badge/이재훈-6e34bf?style=flat-round&logo=GitHub&logoColor=white"/>
        <img width="100%" src="https://avatars.githubusercontent.com/u/127203790?v=4"  alt=""/>
        </a>
        <center>장바구니 목록</center><br>
        <center>장바구니 제품 삭제</center><br>
        <center>장바구니 제품 수정</center><br>
        <center>장바구니 제품 선택 계산</center><br>
        <center>장바구니 제품 추가</center><br>
      </td>
      <td align="center" width="200px">
        <center></center><br>
        <a href="https://github.com/imjeongjin">
          <img src="https://img.shields.io/badge/김정진-345ebf?style=flat-round&logo=GitHub&logoColor=white"/>
        <img width="100%" src="https://avatars.githubusercontent.com/u/124764438?v=4"  alt=""/>
        </a>
        <center>제품 결제</center><br>
        <center>결제 목록</center><br>
        <center>장바구니 제품 결제</center><br>
        <center>제품 선물하기</center><br>
      </td>
      <td align="center" width="200px">
        <center></center><br>
        <a href="https://github.com/JeYeongR">
          <img src="https://img.shields.io/badge/류제영-ff5e5e?style=flat-round&logo=GitHub&logoColor=white"/>
        <img width="100%" src="https://avatars.githubusercontent.com/u/113500815?v=4"  alt=""/>
        </a>
        <center>제품 목록</center><br>
        <center>베스트 제품 목록</center><br>
        <center>제품 상세</center><br>
        <center>결제 제품 상세</center><br>
        <center>좋아요</center><br>
        <center>제품 리뷰 목록</center><br>
      </td>
      <td align="center" width="200px">
        <center></center><br>
        <a href="https://github.com/namsuhan0322">
          <img src="https://img.shields.io/badge/남수한-34bfa6?style=flat-round&logo=GitHub&logoColor=white"/>
        <img width="100%" src="https://avatars.githubusercontent.com/u/142658057?v=4"  alt=""/>
        </a>
        <center>회원가입</center><br>
        <center>로그인</center><br>
        <center>아이디 중복확인</center><br>
        <center>배송지 정보 추가</center><br>
        <center>사용자 등록 정보 조회</center><br>
      </td>
     </tr>
  </tbody>
</table>

### 💁‍♂️ [프론트 GitHub](https://github.com/wecode-bootcamp-korea/49-2nd-TeaTime-frontend)
<br/><br/>


##  :hammer: 기술 스택
![Node.js](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeORM](https://img.shields.io/badge/typeorm-000000?style=for-the-badge&logo=typeorm&logoColor=white)
![Bcrypt](https://img.shields.io/badge/bcrypt-000000?style=for-the-badge&logo=Bcrypt&logoColor=white)
![JSON Web Tokens](https://img.shields.io/badge/JSON%20Web%20Tokens-000000?style=flat-round&logo=json-web-tokens)
![Mysql](https://img.shields.io/badge/Mysql-003545?style=flat-round&logo=Mysql&logoColor=white)
![Amazon Web Services](https://img.shields.io/badge/Amazon%20Web%20Services-232F3E?style=flat-round&logo=amazon-aws&logoColor=white)

- Nods.js
- Express.js
- TypeORM
- Bcrypt
- JSON Web Tokens
- Mysql
- Amazon Web Services

<br/><br/>

## 📄 아키텍쳐
<img width="507" alt="Wecode2nd" src="https://github.com/wecode-bootcamp-korea/49-2nd-TeaTime-backend/assets/113500815/08e29a4f-c2be-45d0-8819-a4f057a84048">


<br/><br/>

## :floppy_disk: ER 다이어그램 (ER-Diagram with Cardinality Constraints)
<img width="1098" alt="Wecode2nd_ERD" src="https://github.com/wecode-bootcamp-korea/49-2nd-TeaTime-backend/assets/113500815/f6b173f0-95d6-4ce0-b568-068fdf4d41c0">

<br/><br/> 


## 🙋‍♂️ 구현 기능
### 회원
- 회원가입
  - 유효성 검사
  - bcrypt 사용하여 비밀번호 암호화 
- 로그인
  - bcrypt 사용하여 비밀번호 검증
  - JWT 발행


### 제품
- 베스트 상품 목록 조회
  - 정렬
- 제품 목록 조회
  - 제품 카테고리 필터, 정렬
  - 페이징 처리
- 제품 상세 조회
- 결제용 제품 상세 조회
  - 기존 제품 상세 조회와 다르게 간단하게 보내줌
- 제품 리뷰 조회
  - 페이징 처리
  - 이미지 유무 필터
 

### 좋아요
- 좋아요
  - 좋아요가 되어있으면 취소, 아니면 추가
 

### 결제
- 제품 결제
  - 트랜잭션 사용 
- 장바구니 제품 결제
  - 장바구니에서 선택한 제품들을 결제
- 결제 목록 조회
- 제품 선물하기
  - 트랜잭션 사용  


### 장바구니
- 장바구니 목록 조회
- 장바구니 삭제
- 장바구니 수정
- 장바구니 추가
- 장바구니 선택 계산

<br/><br/>
