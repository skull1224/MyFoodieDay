// 기분별 요소를 표시합니다.
function showMoodOptions() {
  var moodOptions = document.querySelector(".mood-options");
  moodOptions.style.display = "block";
}

// 기분별 버튼 클릭 시 옵션 메뉴 표시/숨김 처리
function toggleMoodOptions() {
  var moodOptions = document.querySelector(".mood-options");
  var seasonOptions = document.querySelector(".season-options");
  var aiOptions = document.querySelector(".ai-options");
  seasonOptions.style.display = "none";
  aiOptions.style.display = "none";
  if (moodOptions.style.display === "block") {
    moodOptions.style.display = "none";
  } else {
    moodOptions.style.display = "block";
  }
}

// 각 카테고리를 클릭했을 때 선택된 카테고리를 콘솔에 출력
function handleMoodCategoryClick(event) {
  var selectedCategory = event.target.textContent;
  console.log("선택된 기분:", selectedCategory);
}

// 기분별 버튼 클릭 시 이벤트 리스너 등록
var moodButton = document.getElementById("mood");
moodButton.addEventListener("click", toggleMoodOptions);

// 각 카테고리에 클릭 이벤트 리스너 등록
var moodCategories = document.querySelectorAll(".mood-option");
moodCategories.forEach(function (category) {
  category.addEventListener("click", handleMoodCategoryClick);
});
