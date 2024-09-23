// 기분별 요소를 표시합니다.
function showAiOptions() {
    var aiOptions = document.querySelector(".ai-options");
    aiOptions.style.display = "block";
  }
  
  // 기분별 버튼 클릭 시 옵션 메뉴 표시/숨김 처리
  function toggleAiOptions() {
    var aiOptions = document.querySelector(".ai-options");
    var moodOptions = document.querySelector(".mood-options");
    var seasonOptions = document.querySelector(".season-options");
    moodOptions.style.display = "none";
    seasonOptions.style.display = "none";
    if (aiOptions.style.display === "block") {
      aiOptions.style.display = "none";
    } else {
      aiOptions.style.display = "block";
    }
  }
  
  // AI검색 버튼 클릭 시 이벤트 리스너 등록
  var aiButton = document.getElementById("ai");
  aiButton.addEventListener("click", toggleAiOptions);
  
 
  
  