"use client";

import * as S from "./style";
import { useRouter } from "next/navigation";

const Button = () => {
  const { push } = useRouter();
  return (
    <S.ButtonWrapper onClick={() => push(`/Naver-map`)}>
      <S.SpanContainer>
        <S.Span1>네이버 지도 API </S.Span1>
        <S.Span2>바로 가기 </S.Span2>
      </S.SpanContainer>
    </S.ButtonWrapper>
  );
};

export default Button;
