import React, { useEffect } from 'react';
import { API_BASE_URL, USER } from '../../config/host-config';

const KakaoLoginHandler = () => {
  console.log(
    '사용자가 동의화면을 통해 필수정보 동의 후 Kakao 서버에서 redirect를 진행함!'
  );

  const REQUEST_URL = API_BASE_URL + USER;

  // URL에 쿼리스트링으로 전달된 인가코드(파라미터명 code)를 얻어오는 방법
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    // 컴포넌트가 렌더링 될 때, 인가 코드를 백엔드로 전송하는 fetch 요청
    const kakaoLogin = async () => {
      // 어차피 파라미터 값으로 보내므로 헤더설정 이런 건 따로 하지 않겠음!
      const res = await fetch(REQUEST_URL + '/kakaoLogin?code=' + code);
    };

    // 렌더링 될 때 위에 선언한 함수가 한 번 실행될 수 있도록 호출한 것.
    kakaoLogin();
  }, []);

  return <div>KakaoLoginHandler</div>;
};

export default KakaoLoginHandler;
