let colors = ["darkblue", "tan", "maroon"];

async function fetchText() {
    let response = await fetch('https://api.covidtracking.com/v1/us/current.json');

    console.log(response.status); 

    if (response.status === 200) {
        let data = await response.json();
        let total = data[0].deathIncrease;


        for (x=0; x < total; x++) {
            let div = document.createElement("div");
            let currentColor =  Math.floor(Math.random() * Math.floor(colors.length));
            div.style.backgroundColor = colors[currentColor];
            div.textContent="👤"
            document.getElementById("image-section").appendChild(div);
        }

        document.getElementById("image-text").textContent=total;
        
    }
}

fetchText();

