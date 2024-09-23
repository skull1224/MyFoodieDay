const URL = "./my_model/";
let model, image, labelContainer, maxPredictions, mlResult;
// 사용자가 이미지 파일을 선택하면, 파일을 로드하고 이미지를 예측에 사용
document.getElementById("image-upload").addEventListener("change", (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = function() {
        image = new Image();
        image.src = reader.result;
        image.onload = predict;
    }
    reader.readAsDataURL(file);
});

// 이미지 모델을 로드하고 설정
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // 모델과 메타데이터를 로드
    // tmImage.loadFromFiles()를 API에 참조하여 파일 선택기에서 파일을 지원하거나
    // 로컬 하드 드라이브에서 파일을 지원
    // 참고: pose 라이브러리는 "tmImage" 객체를 윈도우에 추가 (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // DOM에 요소를 추가
    labelContainer = document.getElementById("label-container");
    if (labelContainer) {
        for (let i = 0; i < maxPredictions; i++) { // 클래스 레이블
            labelContainer.appendChild(document.createElement("div"));
        }
    }
}

// 이미지를 이미지 모델을 통해 실행
async function predict() {
    // predict는 이미지, 비디오 또는 canvas HTML 요소를 입력으로 받을 수 있음
    const prediction = await model.predict(image);
    
    // 가장 높은 확률을 가진 클래스 찾기
    let maxProbability = 0;
    let maxIndex = 0;
    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability > maxProbability) {
            maxProbability = prediction[i].probability;
            maxIndex = i;
        }
    }
    
    // 결과 표시
    const classPrediction = prediction[maxIndex].className;

    mlResult = classPrediction;
    console.log(classPrediction);
    console.log(mlResult);
    try {
		console.log(mlResult);
        let aiDataSet = await getAiDataSet(mlResult);

		console.log( "db 삽입 완료");
        // 기존 마커 삭제
        closeMarker();

        // 기존 상세 식당 정보창 닫기
        closeInfoWindow();

        setMap(aiDataSet);
		console.log("마커 변경 완료");
    } catch (e) {
        console.error(e);
    }
}

// 페이지가 로드되면 init 함수를 호출하여 모델 로드 시작
window.onload = init;
