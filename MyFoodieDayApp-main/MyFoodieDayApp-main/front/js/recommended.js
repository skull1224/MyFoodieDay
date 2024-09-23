// 추천 메뉴 버튼 클릭 시 이벤트 처리
// function handleRecommendedClick() {
//     console.log("추천 메뉴가 선택되었습니다.");
//     var seasonOptions = document.querySelector(".season-options");
//     var moodOptions = document.querySelector(".mood-options");
//     seasonOptions.style.display = "none"
//     moodOptions.style.display = "none";
//     // 여기에 추천 메뉴에 대한 추가적인 동작을 작성합니다.
//   }
  
  // 추천 메뉴 버튼에 클릭 이벤트 리스너 등록
  var recommendedButton = document.getElementById("today");
  recommendedButton.addEventListener("click", TodayHandler);

  async function TodayHandler(event) {
    try {
      let todayDataSet = await getTodayDataSet();
  
      // 기존 마커 삭제
      closeMarker();
  
      // 기존 상세 식당 정보창 닫기
      closeInfoWindow();
  
      setMap(todayDataSet);
    } catch (e) {
      console.error(e);
    }
  }