var firebaseConfig = {
    apiKey: "AIzaSyAUOylFTLZLvKen6fj1c2CBPJMUh0Yjwvs",
    authDomain: "nuevoproyecto-79041.firebaseapp.com",
    databaseURL: "https://nuevoproyecto-79041-default-rtdb.firebaseio.com",
    projectId: "nuevoproyecto-79041",
    storageBucket: "gs://nuevoproyecto-79041.appspot.com",
    messagingSenderId: "722854911497",
    appId: "1:722854911497:web:e293c13b13e62fc83de2d8",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);

function uploadImage() {
    const ref = firebase.storage().ref();
    const file = document.querySelector("#photo").files[0];
    const name = +new Date() + "-" + file.name;
    const metadata = {
        contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            console.log(url);
            document.querySelector("#image").src = url;
        })
        .catch(console.error);
}

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById("snap");
const errorMsgElement = document.querySelector('span#errorMsg');

const constraints = {
    audio: false,
    video: {
        width: 400,
        height: 400
    }
};

// Access webcam
async function init() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
    } catch (e) {
        errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
    }
}

// Success
function handleSuccess(stream) {
    window.stream = stream;
    video.srcObject = stream;
}

// Load init
init();

// Draw image
var context = canvas.getContext('2d');
snap.addEventListener("click", function() {
    context.drawImage(video, 0, 0, 640, 480);
    var image = new Image();
    image.id = "pic";
    image.src = canvas.toDataURL();
    console.log(image.src)
    var button = document.createElement('button')
    button.textContent = 'Upload Image'
    document.body.appendChild(button)

    button.onclick = function() {
        const ref = firebase.storage().ref();
        ref.child(new Date() + '-' + 'base64').putString(image.src, 'data_url').then(function(snapshot) {
            console.log('Uploaded a data_url string!');
            alert("Image Uploaded")
        });
    }
});
//Conexion de redes
// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
    checkConnection();
}

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';

    alert('Tipo de conexión : ' + states[networkState]);
}