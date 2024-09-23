// 기분별 요소를 표시합니다.
function showSeasonOptions() {
    var seasonOptions = document.querySelector(".season-options");
    seasonOptions.style.display = "block";
  }
  

// 기분별 버튼 클릭 시 옵션 메뉴 표시/숨김 처리
function toggleSeasonOptions() {
  var seasonOptions = document.querySelector(".season-options");
  var moodOptions = document.querySelector(".mood-options");
  var aiOptions = document.querySelector(".ai-options");
  moodOptions.style.display = "none";
  aiOptions.style.display = "none";
  if (seasonOptions.style.display === "block") {
      seasonOptions.style.display = "none";
  } else {
      seasonOptions.style.display = "block";
  }
}



// 각 카테고리를 클릭했을 때 선택된 카테고리를 콘솔에 출력
function handleSeasonCategoryClick(event) {
  var selectedCategory = event.target.textContent;
  console.log("선택된 계절:", selectedCategory);
}

// 기분별 버튼 클릭 시 이벤트 리스너 등록
var seasonButton = document.getElementById("season");
seasonButton.addEventListener("click", toggleSeasonOptions);

// 각 카테고리에 클릭 이벤트 리스너 등록
var seasonCategories = document.querySelectorAll(".season-option");
seasonCategories.forEach(function (category) {
  category.addEventListener("click", handleSeasonCategoryClick);
});
  