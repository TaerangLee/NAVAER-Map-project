import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
`;

const MainContainer = styled.div`
  width: 80vw;
  height: 80vh;
  border-radius: 1.25rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.25rem;
`;
const Button = styled.div`
  top: 1.25rem;
  left: 1.25rem;
  background-color: lightblue;
  padding: 0.625rem 1.25rem;
  border-radius: 7px;
  cursor: pointer;
  color: white;
  font-weight: 600;
  margin-top: 1.25rem;
`;

export default function Map() {
  useEffect(() => {
    const initMap = () => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.5666805, 126.9784147),
        zoom: 10,
        zoomControl: true,
      };

      const map = new window.naver.maps.Map("map", mapOptions);

      const marker = new naver.maps.Marker({
        // 첫 마커 위치 설정
        position: new naver.maps.LatLng(35.1595454, 126.8526012),
        map: map,
      });

      naver.maps.Event.addListener(map, "click", function (e) {
        marker.setPosition(e.coord); // 클릭한 위치에 마커 두기!!
        // const address = `${e.coord._lat},${e.coord._lng}`; // 좌표를 문자열로 변환
        const address = "상무대로 312";
        console.log(address);

        naver.maps.Service.geocode(
          {
            query: address,
          },
          function (status, response) {
            if (status === naver.maps.Service.Status.ERROR) {
              alert("ERROR");
            } else {
              console.log(response);
            }
          }
        );
      });

      const locations = [
        // 경도, 위도 위치 설정하기.
        {
          name: "Jeju",
          position: new window.naver.maps.LatLng(33.3590628, 126.534361),
        },
        {
          name: "Seoul",
          position: new naver.maps.LatLng(
            37.42829747263545,
            126.76620435615891
          ),
        },
        {
          name: "Busan",
          position: new window.naver.maps.LatLng(35.1797865, 129.0750194),
        },
        {
          name: "Gwangju",
          position: new window.naver.maps.LatLng(35.1595454, 126.8526012),
        },
        // Add more locations here
      ];

      locations.forEach((location) => {
        const button = document.getElementById(
          `to-${location.name.toLowerCase()}`
        );
        if (button) {
          button.addEventListener("click", function () {
            map.panTo(location.position);
          });
        }
      });
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
      <ButtonContainer>
        <Button id="to-jeju">Jeju</Button>
        <Button id="to-seoul">Seoul</Button>
        <Button id="to-busan">Busan</Button>
        <Button id="to-gwangju">Gwangju</Button>
      </ButtonContainer>
    </Main>
  );
}
