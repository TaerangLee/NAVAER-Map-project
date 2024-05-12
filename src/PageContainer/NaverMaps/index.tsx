import { useEffect, useState } from "react";
import * as S from "./style";
import { SearchIcon } from "@/assets";
import { toast } from "react-toastify";
import { renderToString } from "react-dom/server";

const locations = [
  // 경도, 위도 위치 설정하기.
  {
    id: "jeju",
    name: "제주",
    position: { latitude: 33.3590628, longitude: 126.534361 },
  },
  {
    id: "seoul",
    name: "서울",
    position: { latitude: 37.42829747263545, longitude: 126.76620435615891 },
  },
  {
    id: "busan",
    name: "부산",
    position: { latitude: 35.1797865, longitude: 129.0750194 },
  },
  {
    id: "gwangju",
    name: "광주",
    position: { latitude: 35.1595454, longitude: 126.8526012 },
  },
  // 더 많은 위치 추가
];

export default function Map() {
  const [search, setSearch] = useState<string>("");
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [map, setMap] = useState<any>(null); // map 상태 추가

  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.onload = () => setMapLoaded(true);
    mapScript.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP}&submodules=geocoder`;
    document.head.appendChild(mapScript);

    return () => {
      document.head.removeChild(mapScript);
    };
  }, []);

  useEffect(() => {
    if (mapLoaded) {
      initMap();
    }
  }, [mapLoaded]);

  const initMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(37.5666805, 126.9784147),
      zoom: 10,
      zoomControl: true,
      mapTypeControl: true,
    };

    const naverMap = new window.naver.maps.Map("map", mapOptions); // 새로운 변수로 map 설정

    setMap(naverMap); // map 상태 업데이트

    // 시작했을 때 마커 찍기

    // const marker = new window.naver.maps.Marker({
    //   position: new window.naver.maps.LatLng(35.1595454, 126.8526012),
    //   map: naverMap,
    // });

    // naver.maps.Event.addListener(naverMap, "click", function (e) {
    //   marker.setPosition(e.coord);
    //   console.log(e.coord);
    // });

    locations.forEach((location) => {
      const button = document.getElementById(`to-${location.id}`);
      if (button) {
        button.addEventListener("click", function () {
          naverMap.panTo(
            new window.naver.maps.LatLng(
              location.position.latitude,
              location.position.longitude
            )
          );
        });
      }
    });
  };

  const handleSearch = () => {
    if (search && map) {
      naver.maps.Service.geocode(
        {
          query: search,
        },
        function (status, response) {
          if (status === naver.maps.Service.Status.ERROR) {
            alert("ERROR");
          } else {
            if (response.v2.addresses && response.v2.addresses.length > 0) {
              console.log(response);

              const newAddress = [
                response.v2.addresses[0].x,
                response.v2.addresses[0].y,
              ];

              const latitude = Number(newAddress[1]);
              const longitude = Number(newAddress[0]);

              // 마커를 생성하고 좌표를 설정
              const marker = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(latitude, longitude),
                map: map,
              });

              // 지도를 마커 위치로 이동
              map.setCenter(new window.naver.maps.LatLng(latitude, longitude));

              // 지도의 줌 레벨을 조절
              map.setZoom(16);

              setSearch("");

              const infoWindowContent = renderToString(
                <div style={{ padding: "5px 10px", background: "white" }}>
                  {response.v2.addresses[0].addressElements[6].longName && (
                    <span>
                      {response.v2.addresses[0].addressElements[6].longName}
                      <br />
                    </span>
                  )}
                  <span>
                    우편 번호 :{" "}
                    {response.v2.addresses[0].addressElements[8].longName}
                  </span>
                </div>
              );

              // 정보창 생성 및 열기
              const infoWindow = new naver.maps.InfoWindow({
                content: infoWindowContent,
                // anchorSize: { // 앵커 위치?
                //   width: 1,
                //   height: 1,
                // },

                disableAutoPan: true, // 정보 창이 지도의 중심에 자동으로 이동하지 않도록 설정
                borderColor: "#cecdc7",
              });

              infoWindow.open(map, marker);

              naver.maps.Event.addListener(marker, "mouseout", () => {
                infoWindow.close(); // 마커에서 마우스가 벗어날 때 정보 창을 닫습니다.
              });
            } else {
              toast.error("없는 주소입니다.");
            }
          }
        }
      );
    } else {
      toast.error("도로명을 입력해주세요.");
    }
  };

  return (
    <S.Main>
      <S.MainContainer id="map">
        <S.MapContainer>
          <S.SearchContainer>
            <S.SearchInput
              placeholder="도로명을 입력해주세요."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <S.Search onClick={handleSearch}>
              <SearchIcon />
            </S.Search>
          </S.SearchContainer>
        </S.MapContainer>
      </S.MainContainer>
      <S.ButtonContainer>
        {locations.map((location) => (
          <S.Button key={location.id} id={`to-${location.id}`}>
            {location.name}
          </S.Button>
        ))}
      </S.ButtonContainer>
    </S.Main>
  );
}
