//Creating a database
$(document).on("ready", function () {
    databaseHandler.createDatabase();

    $.mobile.changePage("login.html");
});


function toRegister() {
    $.mobile.changePage("register.html");
}

function loginUserdata() {

    var username = $("#txtUsername").val();
    var passwords = $("#txtPasswords").val();
    sessionStorage.setItem("user_info", "");
    if (!username) {
        alert("Username is required");
    } else if (!passwords) {
        alert("Password is required");
    } else {
        //var r = confirm("Username: " + username + "\n" + "Passwords: " + passwords);
        var r = true;
        if (r == true) {
            loginHandler.loginUser(username, passwords);

            $("#txtPasswords").val("");
            $("#txtRowid").val("");
            var nameinfo = sessionStorage.getItem("user_info");

            if (nameinfo.length > 0) {

                $.mobile.changePage("index.html");
            }
        }
    }
}
//Getting gps position
function getPosition() {
    var options = {
        enableHighAccuracy: true,
        maximumAge: 3600000
    }
    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    //Adding data to field 
    function onSuccess(position) {
        $("#txtGPS").val("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude + " Altitude: " + position.coords.altitude );
    };

    function onError(error) {
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }
}
//Adding item in table
function addUserdata() {
    var username = $("#txtUsername").val();
    var passwords = $("#txtPasswords").val();
    if (!username) {
        alert("Username is required");
    } else if (!passwords) {
        alert("Password is required");
    } else {
        var r = confirm("Username: " + username + "\n" + "Passwords: " + passwords);
        if (r == true) {
            pwdHandler.addUser(username, passwords);
            $("#txtPasswords").val("");
            $("#txtRowid").val("");
            sessionStorage.setItem("user_info", username);

            $.mobile.changePage("index.html");
        }
    }
}

function addLocationdata() {
    var username = sessionStorage.getItem("user_info");
    var location = $("#txtLocation").val();
    var gps = $("#txtGPS").val();

    if (!location) {
        alert("Location information is required!");
    } else if (!gps) {
        alert("GPS is required!");
    } else {

        locationDataHandler.addAction(username, location, gps);
        document.getElementById("caches").reset();

    }
}
function updateLocationdata() {
    var username = sessionStorage.getItem("user_info");
    var location = $("#showLocation").val();
    var gps = $("#showGPS").val();
    var rowInfo = $("#rowInfo").val();
    if (!location) {
        alert("Location information is required!");
    } else if (!gps) {
        alert("GPS is required!");
    } else {

        locationDataHandler.updateRowData(username, location, gps, rowInfo);
        document.getElementById("selectedCache").reset();

    }
}
function deleteLocationdata() {
    var username = sessionStorage.getItem("user_info");
    var location = $("#showLocation").val();
    var gps = $("#showGPS").val();
    var rowInfo = $("#rowInfo").val();
    if (!location) {
        alert("Location information is required!");
    } else if (!gps) {
        alert("GPS is required!");
    } else {
        var r = confirm("Delete is permanent, continue?");
        if (r == true) {
            locationDataHandler.deleteRowData(rowInfo);
            document.getElementById("selectedCache").reset();
        }
    }
}
function getLocationdata() {

    var username = sessionStorage.getItem("user_info");

    getLocationHandler.getLocationData(username);

}


function showData(ind) {
    var username = sessionStorage.getItem("user_info");
    
    $("#txtList").innerHTML = "";
    getLocationHandler.showRowData(username, ind);

}

function resetForm() {
    document.getElementById("caches").reset();
}

(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();