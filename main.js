const Http = new XMLHttpRequest();
const url = 'https://www.dnd5eapi.co';

var canGetRandom = false;
Http.open("GET", url + "/api/magic-items");
Http.send();

var listOfItems = {};

const form = document.getElementById('submit');

form.addEventListener('click', submit);

var maxLoaded = 0;
var loaded = 0;


Http.onload = (e)=>{
    console.log(Http.responseText);
    document.getElementById("response").innerHTML = "Loading Items...";

    const jsonObj = JSON.parse(Http.responseText);

    getAllItems(jsonObj);
}

function getAllItems(jsonObj){
  maxLoaded = Object.keys(jsonObj["results"]).length;
  jsonObj["results"].forEach((element) => {
    var indUrl = element["url"];
    const iHttp = new XMLHttpRequest();
    iHttp.open("GET", url + indUrl);
    iHttp.send();

    iHttp.onload = (e)=>{
      listOfItems[element["name"]] = JSON.parse(iHttp.responseText);
      itemFound();
    }
  });

}

function itemFound(){
  loaded ++;
  if(loaded < maxLoaded){
    document.getElementById("response").innerHTML = "Loading..."+loaded+"/"+maxLoaded;
  } else {
    document.getElementById("response").innerHTML = "Go Get Your Items!";
    canGetRandom = true;
  }
}


function getRandomItems(numOfItems){
  var arrayOfItems=[];
  var top = Object.keys(listOfItems).length;
  console.log(top);

  for(var i = 0; i < numOfItems; i ++){
    var index = Math.floor(Math.random() * top);

    var keyHere = Object.keys(listOfItems)[index];
    var objHere = listOfItems[keyHere];
    console.log(objHere);

    arrayOfItems[i] = "<br>"+ objHere["name"] + ": " + objHere["rarity"]["name"];
  }

  arrayOfItems.sort();
  console.log(arrayOfItems);
  document.getElementById("response").innerHTML = arrayOfItems;
}

function submit(event){
  if(canGetRandom){
    getRandomItems(document.getElementById("numItems").value);
  }
}
