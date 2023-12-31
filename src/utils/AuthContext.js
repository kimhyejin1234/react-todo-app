import React, { useEffect, useState } from 'react';

//새로운 전역 컨택스트 생성
const AuthContext = React.createContext({
  isLoggedIn: false, //로그인 했는지의 여부
  userName: '',
  onLogout: () => {},
  onLogin: (email, password) => {},
});

//위에서 생성한  Ccontext 를 제공할 수 있는 provider
//이 컴포넌트를 통해 자식 컴포넌트에게 인증 상태와 관련된 함수들을 전달할 수 있음.
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  //컴포넌트가 랜더링 될 때 localStorage 에서 로그인 정보를 가지거 와서 상태를 설정
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === '1') {
      setIsLoggedIn(true);
      setUserName(localStorage.getItem('LOGIN_USERNAME'));
    }
  }, []);

  //로그아웃 핸들러
  const logoutHandler = () => {
    localStorage.clear(); //로컬스토리지 내용 전체 삭제
    setIsLoggedIn(false);
    setUserName('');
  };

  //로그인 핸들러
  const loginHandler = (token, userName, role) => {
    localStorage.setItem('isLoggedIn', '1');
    //json에 담긴 인증정보를 클라이언트에 보관
    // 1. 로컬 스토리지 - 브라우저가 종료되어도 보관됨.
    // 2. 세션 스토리지 - 브라우저가 종료되면 사라짐.
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('LOGIN_USERNAME', userName);
    localStorage.setItem('USER_ROLE', role);
    setIsLoggedIn(true);
    setUserName(userName);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userName,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
