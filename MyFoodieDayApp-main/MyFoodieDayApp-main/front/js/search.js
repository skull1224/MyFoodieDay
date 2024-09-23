const searchInput = document.querySelector(".nav-search");

searchInput.addEventListener("keydown", async function(event) {
  if (event.key === "Enter") {
    
    try {
      const inputValue = event.target.value;
    console.log("입력 값:", inputValue);
      let textSearchDataSet = await getTextDataSet(inputValue);
  
      // 기존 마커 삭제
      closeMarker();
  
      // 기존 인포 윈도우 닫기
      closeInfoWindow();
  
      setMap(textSearchDataSet);
    } catch (e) {
      console.error(e);
    }
    // 여기에서 서버로 값을 전송하여 상호작용하는 코드를 작성해주세요.
    // axios 또는 fetch 등을 사용하여 AJAX 요청을 보낼 수 있습니다.
    // 요청 결과를 처리하고 원하는 동작을 수행하면 됩니다.
  }
});