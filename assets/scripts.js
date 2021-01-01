let colors = ["darkblue", "tan", "maroon"];

/* Fades and hides overlay */
function hideOverlay() {
    let fadeTarget = document.getElementById("overlay");
    let fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 200);
 }

async function fetchCount() {
    let response = await fetch('https://api.covidtracking.com/v1/us/current.json');

    console.log(response.status); 

    if (response.status === 200) {
        let data = await response.json();
        let total = data[0].deathIncrease;
        let deathTotal = data[0].death;
        let casesTotal = data[0].positive;
        let totalInICU = data[0].inIcuCurrently;
        let date = (data[0].date).toString();
        //Adds commas to numbers
        let numberTransform = new Intl.NumberFormat('en-US'); 

        //Sets death total to overlay
        document.getElementById("death-total").textContent = numberTransform.format(deathTotal);
        //Sets death total to summary
        document.getElementById("total-death-2").textContent = numberTransform.format(deathTotal);
        //Sets total cases to summary
        document.getElementById("total-cases").textContent = numberTransform.format(casesTotal);
        //Sets ICU cases to summary
        document.getElementById("total-ICU").textContent = numberTransform.format(totalInICU);
        //Sets daily count to summary
        document.getElementById("highlight-lives-lost").textContent = numberTransform.format(total);

       
        //Sets date to display
        let year = date.substring(0, 4);
        let month = date.substring(4, 6);
        let day = date.substring(6, 8);
        let dateToConvert = year + "," + month + "," + day;
        let assembledDate = month + "/" + day + "/" + year;
        let convertedDate = new Date(dateToConvert);
        document.getElementById("data-date").textContent = convertedDate;
        document.getElementById("assembled-date").textContent = assembledDate;

        //Adds block for each person to display
        for (x=0; x < total; x++) {
            let div = document.createElement("div");
            let currentColor =  Math.floor(Math.random() * Math.floor(colors.length));
            div.style.backgroundColor = colors[currentColor];
            div.textContent="👤"
            document.getElementById("image-section").appendChild(div);
        }

        document.getElementById("image-text").textContent = numberTransform.format(total);

        setTimeout(hideOverlay, 4500)
        
    }
}
/* Hides fixed if reaches bottom of screen*/
document.onscroll = function() {
    if (window.innerHeight + window.scrollY > document.body.clientHeight) {
        document.getElementById('text-box').style.display ="none";
    }else {
        document.getElementById('text-box').style.display ="block";
    }

}
fetchCount();
