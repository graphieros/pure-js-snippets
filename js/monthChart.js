function generateData(b, cY, pY, cR){
  const btn = document.getElementById(b);
  const tableCurrentYear = document.getElementById(cY);
  const tablePreviousYear = document.getElementById(pY);
  const canvas = document.getElementById(cR);
  
  btn.addEventListener("click", function(){

    tableCurrentYear.innerHTML ="";
    tablePreviousYear.innerHTML ="";

    let months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ];

    let factor = 10000;
    let random0;
    let random1;
    let i;
    let currentDataSet = [];
    let previousDataSet = [];
    let allValues = [];
    let maxValue;

    function applyGeneration(t, r, s, c){
      for(i = 0; i < months.length; i += 1){
        let P0 = document.createElement("P");
        let P1 = document.createElement("P");
        P0.className = "month";
        P1.className = c;
        r = Math.round(Math.random() * factor);
        if(months[i] === "FEB"){
          r *= 1.5;
        }
        if(months[i] === "MAY"){
          r *=2;
        }
        if(months[i] === "DEC"){
          r *= 5;
        }
        P0.innerHTML = months[i];
        P1.innerHTML = r;
        t.appendChild(P0);
        t.appendChild(P1);
        s.push(r);
        allValues.push(r);
      }
    }

    applyGeneration(tableCurrentYear, random0, currentDataSet, "dataC");
    applyGeneration(tablePreviousYear, random1, previousDataSet, "dataP");

    maxValue = Math.max(...allValues);

    let currentCollection = document.getElementsByClassName("dataC");
    let previousCollection = document.getElementsByClassName("dataP");

    for (i = 0; i < currentCollection.length; i += 1){
      if(Number(currentCollection[i].innerHTML) < Number(previousCollection[i].innerHTML)){
        currentCollection[i].style.color = "red";
      }else{
        currentCollection[i].style.color = "green";
      }
    }

    //canvas rendering
    let ctx = canvas.getContext("2d");
    let heightRatio = 0.67;
    canvas.height = canvas.width * heightRatio;

    let k = (canvas.width - 52) / 12;
    canvas.height = canvas.width * heightRatio;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.lineTo(20, 1230);
    ctx.lineTo(1980, 1230);
    ctx.strokeStyle = "rgb(10,10,10)";
    ctx.stroke();

    for (i = k; i < 2000; i += 1) {
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(i + 20, 20);
      ctx.lineTo(i + 20, 1230);
      ctx.strokeStyle = "rgba(100,100,100,0.5)";
      ctx.stroke();
      i += k;
  }

  //display months names
  for (i = 0; i < months.length; i += 1) {
      ctx.font = "50px Arial";
      ctx.fillStyle = "rgb(150,150,150)";
      ctx.fillText(months[i], k - 100, 1300);
      k += (canvas.width - 70) / 12;
  }

  //display data on the chart

  function draw(input, color) {
    let k2 = (canvas.width - 200) / 12;
    for (i = 0; i < input.length; i += 1) {
        let h = (1 - (input[i]/ maxValue)) * (canvas.height*0.8)+20;
        let h2;
        if (input[i + 1] !== undefined) {
            h2 = (1 - (input[i + 1] / maxValue)) * (canvas.height*0.8)+20;
            ctx.beginPath();
            ctx.arc(k2 - 45, h, 8, 0, 2 * Math.PI);
            ctx.lineWidth = 5;
            ctx.strokeStyle = color;
            ctx.moveTo(k2 - 45, h);
            ctx.lineTo(k2 - 45 + ((canvas.width - 45) / 12), h2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.stroke();
            k2 += (canvas.width - 45) / 12;
        } else {
            h2 = 0;
            ctx.beginPath();
            ctx.arc(k2 - 45, h, 8, 0, 2 * Math.PI);
            ctx.lineWidth = 5;
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.fill();
            ctx.stroke();
            k2 += (canvas.width - 45) / 12;
        }
    }
}

draw(currentDataSet, "rgb(46, 65, 70)");
draw(previousDataSet, "rgb(252,102,3)");

  })
}

generateData(
  "generateData",
  "currentYear",
  "previousYear",
  "chartRender"
)