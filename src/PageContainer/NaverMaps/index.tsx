import { useEffect, useState } from "react";
import * as S from "./style";
import { SearchIcon } from "@/assets";
import { toast } from "react-toastify";

const locations = [
  { name: "Jeju", id: "jeju" },
  { name: "Seoul", id: "seoul" },
  { name: "Busan", id: "busan" },
  { name: "Gwangju", id: "gwangju" },
];

export default function Map() {
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.onload = initMap;
    mapScript.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP}&submodules=geocoder`;
    document.head.appendChild(mapScript);

    return () => {
      document.head.removeChild(mapScript);
    };
  }, []);

  const initMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(37.5666805, 126.9784147),
      zoom: 10,
      zoomControl: true,
    };

    const map = new window.naver.maps.Map("map", mapOptions);

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(35.1595454, 126.8526012),
      map: map,
    });

    naver.maps.Event.addListener(map, "click", function (e) {
      marker.setPosition(e.coord);
    });
  };

  const handleSearch = () => {
    if (search) {
      naver.maps.Service.geocode(
        {
          query: search,
        },
        function (status, response) {
          if (status === naver.maps.Service.Status.ERROR) {
            alert("ERROR");
          } else {
            console.log(response);
          }
        }
      );

      setSearch("");
    } else {
      toast.error("빈칸 입니다.");
    }
  };

  return (
    <S.Main>
      <S.MainContainer id="map">
        <S.InputContainer>
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
        </S.InputContainer>
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
