// 로컬 스토리지에서 x-access-token 확인
const jwt = localStorage.getItem("x-access-token");
setHeader(jwt);

// 로그아웃 이벤트 연결
const signOutBtn = document.querySelector("#sign-out");
signOutBtn.addEventListener("click", signOut);

async function setHeader(jwt) {
    if (!jwt) {
        return false;
    }

    // 토큰 검증 API 요청
    const jwtReturn = await axios({
        method: "get",
        url: url + "/jwt",
        headers: {"x-access-token": jwt},
        data: {},
    });

    // 유효한 토큰 아니라면 로그아웃
    const isValidJwt = jwtReturn.data.code == 200;
    if(!isValidJwt){
        signOut();
        return false;
    }

    // 유효한 토큰이라면 로그인 상태 확인. 헤더 로그인 / 회원가입
    const userIdx = jwtReturn.data.result.userIdx;
    const nickname = jwtReturn.data.result.nickname;

    const unsignedDiv = document.querySelector(".unsigned");
    const signedDiv = document.querySelector(".signed");
    const nickNameSpan = document.querySelector(".nickname");

    unsignedDiv.classList.add("hidden");
    signedDiv.classList.remove("hidden"); //hidden 삭제
    nickNameSpan.innerText = nickname;

    return true;
}

function signOut (event){
    localStorage.removeItem("x-access-token"); // 토큰 삭제
    location.reload(); // 새로고침
}