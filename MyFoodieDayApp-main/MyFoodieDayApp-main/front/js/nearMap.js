//5월 19일 주변 맛집 찾아주는 기능 연습
navigator.geolocation.getCurrentPosition(function(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
  
	// 현재 위치를 기반으로 주변 맛집 검색 및 표시하는 함수 호출
	searchNearbyRestaurants(latitude, longitude);
});


function searchNearbyRestaurants(latitude, longitude) {
	var center = new kakao.maps.LatLng(latitude, longitude);
	var places = new kakao.maps.services.Places();
  
	places.categorySearch('FD6', function(result, status) {
	  if (status === kakao.maps.services.Status.OK) {
			// 검색 결과를 활용하여 지도에 마커로 표시하는 로직 구현
			for (var i = 0; i < result.length; i++) {
				createMarker(result[i]);
			}
	  }
	}, {
	  location: center,
	  radius: 1000 // 1km 반경 내에서 검색
	});
}
  
// 검색된 맛집 정보를 기반으로 마커 생성 및 정보창 표시
function createMarker(place) {
	var marker = new kakao.maps.Marker({
		map: map,
		position: new kakao.maps.LatLng(place.y, place.x)
	});

	// 마커 클릭 이벤트 처리
	kakao.maps.event.addListener(marker, 'click', function() {
	// 정보창에 맛집 정보 표시
	showInfoWindow(place);
	});
}
  
  
// 맛집 정보를 표시하는 정보창 생성
function showInfoWindow(place) {
	// 정보창 내용 구성
	var infoWindowContent =
	  '<div class="info-window">' +
	  '  <div class="info-title">' + place.place_name + '</div>' +
	  '  <div class="info-address">' + place.address_name + '</div>' +
	  '  <div class="info-url">' +
	  '    <a href="' + place.place_url + '" target="_blank">자세히 보기</a>' +
	  '  </div>' +
	  '</div>';
  
	// 정보창 생성
	var infoWindow = new kakao.maps.InfoWindow({
	  content: infoWindowContent
	});
  
	// 정보창을 마커에 연결하고 열기
	infoWindow.open(map, marker);
  
	// 마커 클릭 이벤트 리스너 추가
	kakao.maps.event.addListener(marker, 'click', function() {
	  // 클릭한 마커의 정보 출력
	  console.log(place);
	});
}