let link = "http://localhost:8080"
let linkAnother = "http://192.168.1.142:8080"
let linkImg = link + "/Image/"
let linkUserInfo = link + "/userInfo/"


function getLists() {
    // if (localStorage.getItem("user") == null) {
    //     location.href = "http://localhost:63342/case4-FE/login.html";
    // }
    getAllUser()

}



function getAllUser() {
    let settings = {
        "url": "http://localhost:8080/api/listCity",
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
        document.getElementById("listCity").innerHTML = displayTableUser(response);
        console.log(response);
    });
}

function displayTableUser(data) {
    let result = ""
    for (let i = 0; i < data.length; i++) {
        result += " <tr class='tr-shadow' id='rowUser'>"
        result += "<td class=''>" + (i + 1) + "</td>"
        result += "<td>" + data[i].name + "</td>"
        result += "<td>" + data[i].nation + "</td>"
        result += "<td><div class='table-data-feature'>"
        result += "<button class='item' type='button' data-toggle='modal' data-target='#infoCity' " +
            "data-placement='top' title='Info' onclick='displayModalInfoCity(" + data[i].id + ")'>"
        result += "<i class='zmdi zmdi-info'></i></button>"

        result += "<button class='item' type='button' data-toggle='modal' data-target='#banAndActiveUser'" +
                " data-placement='top' title='Delete' onclick='getUserIdToBan(" + data[i].id + ")'>"
        result += "<i class='fa fa-close'></i>"

        result += "<button class='item' type='button' data-toggle='modal' data-target='#updateCity'" +
            " data-placement='top' title='Delete' onclick='displaymModalUpdateCity(" + data[i].id + ")'>"
        result += "<i class='fa fa-clock'></i>"

        }
        result += "</button></div></td>"
        result += "<tr class='spacer'></tr>"
    return result;
}

// {
//     "id": 3,
//     "name": "Hà Nội2",
//     "nation": "Việt Nam",
//     "area": 1.0E7,
//     "population": 1.0E9,
//     "gdp": 10000.0,
//     "describes": "thủ đô"
// }


function createCity(idCity){
    let name=document.getElementById("name-input-crete").value
    let nation=document.getElementById("nation-input-crete").value
    let area=document.getElementById("area-input-crete").value
    let population=document.getElementById("population-input-crete").value
    let gdp=document.getElementById("gdp-input-crete").value
    let describes=document.getElementById("describes-input-crete").value
    let city={
        name:name,
        nation:nation,
        area:area,
        population:population,
        gdp:gdp,
        describes:describes
    }
    var settings = {
        "url": "http://localhost:8080/api/createCity",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": JSON.stringify(city),
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        getAllUser()
    });
}
function displaymModalUpdateCity(idCity){
    var settings = {
        "url": "http://localhost:8080/api/" + idCity,
        "method": "GET",
        "timeout": 0,
        "data": "\r",
    };
    $.ajax(settings).done(function (response) {
        let cityInfo = response
        document.getElementById("name-input").value = cityInfo.name;
        document.getElementById("nation-input").value = cityInfo.nation;
        document.getElementById("area-input").value = cityInfo.area;
        document.getElementById("population-input").value = cityInfo.population;
        document.getElementById("gdp-input").value = cityInfo.gdp;
        document.getElementById("describes-input").value = cityInfo.describes;
        console.log(response);
    });
    document.getElementById("confirmUpdateCity").setAttribute("onclick", "updateCity(" + idCity + ")");

}

function updateCity(idCity){
    let name=document.getElementById("name-input").value
    let nation=document.getElementById("nation-input").value
    let area=document.getElementById("area-input").value
    let population=document.getElementById("population-input").value
    let gdp=document.getElementById("gdp-input").value
    let describes=document.getElementById("describes-input").value
    let city={
        name:name,
        nation:nation,
        area:area,
        population:population,
        gdp:gdp,
        describes:describes
    }
    var settings = {
        "url": "http://localhost:8080/api/updateCity/"+idCity,
        "method": "PUT",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",

        },
        "data": JSON.stringify(city),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        getAllUser()
    });
}
function displayModalInfoCity(id) {
    let Authorization = getAuthorization();
    var settings = {
        "url": "http://localhost:8080/api/" + id,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": Authorization,
            "Content-Type": "application/json",
        },
        "data": "\r",
    };
    $.ajax(settings).done(function (response) {
        let cityInfo = response
        document.getElementById("name").innerText = cityInfo.name;
        document.getElementById("nation").innerText = cityInfo.nation;
        document.getElementById("area").innerText = cityInfo.area;
        document.getElementById("population").innerText = cityInfo.population;
        document.getElementById("gdp").innerText = cityInfo.gdp;
        document.getElementById("describes").innerText = cityInfo.describes;
        console.log(response);
    });
}

function getUserIdToBan(id) {
    document.getElementById("confirmActionUser").setAttribute("onclick", "deleteCity(" + id + ")");
}

function deleteCity(id) {
    let settings = {
        "url": "http://localhost:8080/api/deleteCity/" + id,
        "method": "DELETE"
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        getAllUser();
    });

}




function getInfoLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function getAuthorization() {
    let token = localStorage.getItem("token");
    let type = localStorage.getItem("type");
    return type + " " + token;
}