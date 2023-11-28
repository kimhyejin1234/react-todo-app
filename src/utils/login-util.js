//로그인 한 유저의 데이터 객체를 반환하는 함수
export const getLoginUserInfo = () => {
  return {
    token: localStorage.getItem('ACCESS_TOKEN'),
    username: localStorage.getItem('LOGIN_USERNAME'),
    role: localStorage.getItem('USER_ROLE'),
  };
};

//로그인 여부 확인하는 함수
// const isLogin = () => {
//   const token = localStorage.getItem('ACCESS_TOKEN');
//   if (token === null) return false;
//   return true;
// };

// 아래 문장은 위의 주석처리 문장과 동일하다.
//특정 값이나 메서드의 리턴값을 논리 타입으로 변환하고 싶을 때 !! 를 붙입니다.
//localStorage.getItem의 결과를 논리타입으로 리턴 -> 값이 있으면 true, null이면 false로 리턴
export const isLogin = () => !!localStorage.getItem('ACCESS_TOKEN');
