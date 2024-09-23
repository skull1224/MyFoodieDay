var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
   center: new kakao.maps.LatLng(37.228584, 127.187536), //지도의 중심좌표.
   level: 6 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options)

// // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성
// var mapTypeControl = new kakao.maps.MapTypeControl();

// // 지도에 컨트롤을 추가해야 지도 위에 표시
// // kakao.maps.ControlPosition 은 컨트롤이 표시될 위치를 정의
// map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는 컨트롤 생성
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// Today - Server Axios
async function getTodayDataSet() {
	let queryString = category;
	if(!queryString) {
		queryString = "";
	}
	console.log(queryString);
	const TodayDataSet = await axios ({
		method: "get",
		url : `http://localhost:3001/todayRecommend`,
		headers: {}, // Packet Header
		data: {}, // Packet Body
	});

	return TodayDataSet.data.result;
}

// Text Search - Server Axios
async function getLikeDataSet(heart, title) {
	let h = heart;
	let t = title; 

	const textDataSet = await axios ({
		method: "patch",
		url : `http://localhost:3001/updateHeart?heart=${h}&title=${t}`,
		headers: {}, // Packet Header
		data: {}, // Packet Body
	});

	return textDataSet.data.result;
}

// Text Search - Server Axios
async function getTextDataSet(search) {
	let queryString = search;
	if(!queryString) {
		queryString = "";
	}
	const textDataSet = await axios ({
		method: "get",
		url : `http://localhost:3001/textSearch?menu=${queryString}`,
		headers: {}, // Packet Header
		data: {}, // Packet Body
	});

	return textDataSet.data.result;
}

// Ai Search - Server Axios
async function getAiDataSet(search) {
	let queryString = search;
	if(!queryString) {
		queryString = "";
	}
	const AiDataSet = await axios ({
		method: "get",
		url : `http://localhost:3001/aiSearch?menu=${queryString}`,
		headers: {}, // Packet Header
		data: {}, // Packet Body
	});

	return AiDataSet.data.result;
}

// All - Server Axios
async function getAllDataSet() {
	const AllDataSet = await axios ({
		method: "get",
		url : `http://localhost:3001/categoryAll`,
		headers: {}, // Packet Header
		data: {}, // Packet Body
	});

	return AllDataSet.data.result;
}

// Mood - Server Axios
async function getMoodDataSet(category) {
	let queryString = category;
	if(!queryString) {
		queryString = "";
	}
	console.log(queryString + "db 삽입 완료");
	const MoodDataSet = await axios ({
		method: "get",
		url : `http://localhost:3001/moodCategory?mood=${queryString}`,
		headers: {}, // Packet Header
		data: {}, // Packet Body
	});

	return MoodDataSet.data.result;
}

// Season - Server Axios
async function getSeasonDataSet(category) {
	let queryString = category;
	if(!queryString) {
		queryString = "";
	}
	console.log(queryString);
	const SeasonDataSet = await axios ({
		method: "get",
		url : `http://localhost:3001/seasonCategory?season=${queryString}`,
		headers: {}, // Packet Header
		data: {}, // Packet Body
	});

	return SeasonDataSet.data.result;
}

getTodayDataSet();
getTextDataSet();
getAiDataSet();
getSeasonDataSet();
getMoodDataSet();

// 여러개 마커 찍기

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

// 주소 - 좌표 변환 함수
function getCoordsByAddress(address){
	return new Promise((resolve, reject) => {
		// 주소로 좌표를 검색합니다
		geocoder.addressSearch(address, function(result, status) {
				// 정상적으로 검색이 완료됐으면 
				if (status === kakao.maps.services.Status.OK) {
					var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
					resolve(coords);
					return;
				} 
				reject(new Error("getCoordsByAddress Error : new Valid Address"))
			}
		); 
	});
}


// 마커에 인포 윈도우 붙이기 
function getContent(data){
	// 인포 윈도우 가공하기

	return `
    <div class="infowindow">
        <div class="infowindow-body">
            <h5 class="infowindow-title">${data.title}</h5>
            <p class="infowindow-address">${data.address}</p>
            <div id="main-content">
				${data.mood ? `<p class="hashtag-mood"><span>#</span>${data.mood}</p>` : ''}
				${data.season ? `<p class="hashtag-mood"><span>#</span>${data.season}</p>` : ''}
                <div>
                    <input type="checkbox" id="checkbox" />
                    <label for="checkbox" id="heart-label">
                    <svg id="heart-svg" viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg">
                        <g id="Group" fill="none" fill-rule="evenodd" transform="translate(467 392)">
                        <path d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" id="heart" fill="#AAB8C2"/>
                        <circle id="main-circ" fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5"/>

                        <g id="grp7" opacity="0" transform="translate(7 6)">
                            <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2"/>
                            <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2"/>
                        </g>

                        <g id="grp6" opacity="0" transform="translate(0 28)">
                            <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2"/>
                            <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2"/>
                        </g>

                        <g id="grp3" opacity="0" transform="translate(52 28)">
                            <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2"/>
                            <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2"/>
                        </g>

                        <g id="grp2" opacity="0" transform="translate(44 6)">
                            <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2"/>
                            <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2"/>
                        </g>

                        <g id="grp5" opacity="0" transform="translate(14 50)">
                            <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2"/>
                            <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2"/>
                        </g>

                        <g id="grp4" opacity="0" transform="translate(35 50)">
                            <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2"/>
                            <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2"/>
                        </g>

                        <g id="grp1" opacity="0" transform="translate(24)">
                            <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2"/>
                            <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2"/>
                        </g>
                        </g>
                    </svg>
                    </label>
                </div>
            </div>
        </div>
    </div>
    `
}


async function setMap(dataSet) {
	markerArray = [];
	infowindow = [];
	for (var i=0 ; i < dataSet.length ; i++){
		// 마커 생성
		let coords = await getCoordsByAddress(dataSet[i].address);
		var marker = new kakao.maps.Marker({
			map: map, // 마커 표시할 지도
			position: coords, // 마커 표시할 위치
		});

		markerArray.push(marker);

		// 마커에 표시할 인포 윈도우를 생성
		var infowindow = new kakao.maps.InfoWindow({
			content: getContent(dataSet[i]), // 인포 윈도우에 표시할 내용
		});

		infowindowArray.push(infowindow)
		// 마커에 mouseover 이벤트와 mouseout 이벤트를 등록
		// 이벤트 리스너로는 클로저를 만들어 등록
		// for 문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록
		kakao.maps.event.addListener(marker,"click", makeOverListener(map, marker, infowindow, coords));

		kakao.maps.event.addListener(map, "click", makeOutListener(infowindow));
	}
}

// 클릭시 다른 Info Window 닫기
// 인포 윈도우를 표시하는 클로저 만드는 함수
function makeOverListener(map, marker, infowindow, coords) {
	return function(){
		// 클릭 시 다른 인포 윈도우 닫기
		closeInfoWindow()
		infowindow.open(map, marker);
		// 클릭한 곳 지도 중심 옮기기
		map.panTo(coords)
	};
}

let infowindowArray = [];
function closeInfoWindow() {
	for (let infowindow of infowindowArray) {
		infowindow.close();
	}
}

// 인포 윈도우를 닫는 클로저를 만드는 함수
function makeOutListener(infowindow){
	return function(){
		infowindow.close();
	};
}

// 좋아요 
// const checkbox = document.getElementById('checkbox');
// const heartLabel = document.getElementById('heart-label');
// let liked = 0;

// async function LikeData(){
// 	let allDataSet = await getAllDataSet();
// 	setMap(allDataSet);

// 	checkbox.addEventListener('change', async function(event){
//   		if(checkbox.checked){
// 			liked = 1
// 		} else {
// 			liked = 0
// 		}
// 		let title = document.querySelector(".infowindow-title");
// 		await getLikeDataSet(liked, title);
// 	});
// }

// LikedData()

// 카테고리 분류
 
// 기분 카테고리
const MoodMap = {
	sad: "슬픔",
	annoyed: "짜증",
	happy: "행복",
	fuzzy: "꿀꿀",
};

// 계절 카테고리
const SeasonMap = {
	spring: "봄",
	summer: "여름",
	fall: "가을",
	winter: "겨울",
};

// Mood 데이터 분류
const moodList = document.querySelector(".mood-options");
moodList.addEventListener("click", moodCategoryHandler)

async function moodCategoryHandler(event) {
	const moodId = event.target.id;
	const moodCategory = MoodMap[moodId];

	try {
		let moodDataSet = await getMoodDataSet(moodCategory);
		// getSeasonDataSet();

		// 기존 마커 삭제
		closeMarker();

		// 기존 인포 윈도우 닫기
		closeInfoWindow();

		setMap(moodDataSet);
	} catch (e) {
		console.error(e);
	}
	
}

// 계절 데이터 분류
const seasonList = document.querySelector(".season-options");
seasonList.addEventListener("click", seasonCategoryHandler)

async function seasonCategoryHandler(event) {
	// console.log(event.target);
	const seasonId = event.target.id;
	const seasonCategory = SeasonMap[seasonId];

	try {
		let seasonDataSet = await getSeasonDataSet(seasonCategory);
		// getMoodDataSet();

		// 기존 마커 삭제
		closeMarker();

		// 기존 상세 식당 정보창 닫기
		closeInfoWindow();

		setMap(seasonDataSet);
	} catch (e) {
		console.error(e);
	}
	
}

let markerArray = [];
function closeMarker() {
	for (marker of markerArray){
		marker.setMap(null);
	}
}

async function setting() {
	try {
		const allDataSet = await getAllDataSet();
		const todayDataSet = await getTodayDataSet();
		const seasonDataSet = await getSeasonDataSet();
		// const likeDataSet =  await getLikeDataSet();
		const moodDataSet = await getMoodDataSet();
		const textDataSet = await getTextDataSet();
		const aiDataSet = await getAiDataSet();

		setMap(textDataSet);
		// setMap(likeDataSet);
		setMap(aiDataSet)
		setMap(allDataSet);
		setMap(seasonDataSet);
		setMap(todayDataSet);
		setMap(moodDataSet);
	} catch (e) {
		console.error(e);
	}
}

setting();
// setMap(dataSet);











