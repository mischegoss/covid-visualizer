let colors = ["darkblue", "tan", "maroon"];

async function fetchCount() {
    let response = await fetch('https://api.covidtracking.com/v1/us/current.json');

    console.log(response.status); 

    if (response.status === 200) {
        let data = await response.json();
        let total = data[0].deathIncrease;
        let deathTotal = data[0].death;
        let date = (data[0].date).toString();

        document.getElementById("death-total").textContent = deathTotal;
        let year = date.substring(0, 4);
        let month = date.substring(4, 6);
       let day = date.substring(6, 8);
       let dateToConvert = year + "," + month + "," + day;

       let convertedDate = new Date(dateToConvert);

       document.getElementById("data-date").textContent = convertedDate;


        for (x=0; x < total; x++) {
            let div = document.createElement("div");
            let currentColor =  Math.floor(Math.random() * Math.floor(colors.length));
            div.style.backgroundColor = colors[currentColor];
            div.textContent="👤"
            document.getElementById("image-section").appendChild(div);
        }

        document.getElementById("image-text").textContent=total;

        function hideOverlay() {
       var fadeTarget = document.getElementById("overlay");
       var fadeEffect = setInterval(function () {
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

        setTimeout(hideOverlay, 4500)
        
    }
}

fetchCount();
