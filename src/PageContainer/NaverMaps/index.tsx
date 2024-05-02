import React, { useEffect } from "react";
import styled from "@emotion/styled";

const Main = styled.div`
  display: flex;
  align-items: center;
`;

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default function Map() {
  useEffect(() => {
    const initMap = () => {
      const mapOptions = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      };

      new naver.maps.Map("map", mapOptions);
    };

    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      const mapScript = document.createElement("script");
      mapScript.onload = () => initMap();
      mapScript.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP}&submodules=geocoder`;
      document.head.appendChild(mapScript);
    }
  }, []);

  return (
    <Main>
      <MainContainer id="map"></MainContainer>
    </Main>
  );
}
