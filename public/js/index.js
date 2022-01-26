

const mapCanvas = document.getElementById("map");
const mapOptions = {
    center: new kakao.maps.LatLng(37.5642135,127.0016985),
    level: 12,
    minLevel: 6
};
const map = new kakao.maps.Map(mapCanvas,mapOptions);

const icon = new kakao.maps.MarkerImage(
    'https://upload.wikimedia.org/wikipedia/commons/8/8b/Red_Circle_full.png',
    new kakao.maps.Size(8, 8),
    {
        offset: new kakao.maps.Point(4, 4),
        alt: "팬치"
    }
)

let isRegistered = localStorage.getItem("isRegistered");
let pos = [0, 0];
if(poses){
    for(let i = 0; i < poses.length; i+=2){
        setMarker(poses[i], poses[i+1]);
    }
}
if (!isRegistered || isRegistered=="false") {
    register();
}


function setMarker(x, y){
    let marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(x, y),
        map: map,
        image: icon
    });
}

function register(){
    if(confirm("자신의 위치를 기록하시겠습니까?(위치 데이터만 사용, 삭제 불가능, 기록하지 않더라도 보기 가능)")){
        navigator.geolocation.getCurrentPosition((position) => {
            pos[0] = position.coords.latitude;
            pos[1] = position.coords.longitude;
            
            localStorage.setItem("isRegistered", true);
            setMarker(pos[0], pos[1]);
            const myPos = {
                x: pos[0],
                y: pos[1]
            };
            const sendData = JSON.stringify(myPos);
            const data = fetch('/pos',
                {
                    method: "POST",
                    body: sendData,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            .then(function(response) {
                return response.json();
              })
              .then(function(myJson) {
                console.log(myJson);
              });
        });
    }
}



const setMap = () => {
    
};