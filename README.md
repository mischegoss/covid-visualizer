# Use the JavaScript Fetch API to Get COVID-19 Data

The Fetch API is a simple way to make web requests and handle responses. In this tutorial, we will use Fetch API to make a request to a third-party API to retrieve data.

## Prerequisites

You should be comfortable with JavaScript fundamentals and have some understanding of HTML and CSS.

## What is an API? 

APIs or Application Programming Interfaces allow us to perform complex functions or retrieve data with only a few lines of code. 

We will use two kinds of APIs to fetch the COVID-19 data.  

  * __Browser-Level APIs__ are built into the browser and allow us to implement complex functionality easily. We will use the Fetch API's `fetch()` method to retrieve our data. We will also use the Web API methods `body.json()` and `document.getElementById()` to parse the data and select the HTML element we want to update. 

  * __Third-Party APIs__ are developed by a third-party source and can be used to access functionality or data from another source. We will access COVID-19 data from the [COVID Tracking Project API](https://covidtracking.com/data/api).

## Using the COVID Tracking Project API

To interact with a third-party API, it is important to look [directly at the docs](https://covidtracking.com/data/api).

The COVID Tracking Project API does not require a key. Instead, we can fetch data directly using the URL provided to retrieve the current data. 

  ```md
  https://api.covidtracking.com/v1/us/current.json
  ```

## Using the Fetch API

In our JavaScript file, we create a function to hold the code we need to fetch our data and insert it into the user interface. Since the Fetch API returns a promise, we use the [`async` keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) to declare the function asynchronous.

Using `async/await` also simplifies the syntax needed to get up and running. 


  ```js
  async function fetchCount() {/*We will add our functionality here*/}
  ```

Inside the `fetchCount()` function, we use the `fetch()` method to retrieve data from the COVID Tracking API and store the results in a variable. We add the `await` keyword in front of the method so that the action is completed only after the fetch is performed. 

Please note that `await` only works if the `async` keyword has been used to declare a function asynchronous! 

  ```js
  let response = await fetch('https://api.covidtracking.com/v1/us/current.json');
  ```

We store the data returned in a variable `data` and use the [`body.json()` method](https://developer.mozilla.org/en-US/docs/Web/API/Body/json) to parse the response text as `JSON`. This will allow us to easily use the retrieved data as a JSON object. 

  ```js
   let data = await response.json();
  ```

To use the data, we store the values found in the `data` JSON object in variables. This allows us to easily populate our user interface or otherwise use the data in our JavaScript code. 

  ```js
  let total = data[0].deathIncrease;
  let deathTotal = data[0].death;
  let casesTotal = data[0].positive;
  let totalInICU = data[0].inIcuCurrently;
  let date = (data[0].date).toString();
  ```

## Handling Unsuccessful Responses

When the Fetch API attempts to retrieve data, a [response object](https://developer.mozilla.org/en-US/docs/Web/API/Response) is returned, even if the fetch was unsuccessful. 

We can use the `response.status` property of this returned object to test if the fetch was successful, and, if so, handle the data.  

  ```js
  if (response.status === 200) {/*Code to store and manipulate retrieved data*/}
  ```

If the response is not successful, we simply console log the status returned. 

  ```js
  console.log("Status returned: " + response.status);
  ```

## Updating our User Interface

To display the data to our users, we use the [`document.getElementById()` Web API method](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) and the [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) property.

The `document.getElementbyId()` method selects an HTML element by its `id` attribute. 

  * In the HTML, we add an `id` attribute to the element we want to select. 

    ```html
    <p class="overlay-text" id="death-total"></p>
    ```

  * We use the `id` attribute to select the element using `document.getElementById()`.

    ```js
    document.getElementById("death-total")
    ```

Next, we use the `textContent` property to set the content of the selected HTML element to the value we want to display. 

  ```js
  document.getElementById("death-total").textContent = deathTotal;
  ```

Sometimes, the data -- including numbers -- may need to be reformatted to display in a user-friendly manner. To format a date, we use the [Intl.NumberFormat object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).

  ```js
  let numberTransform = new Intl.NumberFormat('en-US'); 
  document.getElementById("death-total").textContent = numberTransform.format(deathTotal);
  ```

## Error Handling

All `async` functions return a promise, so to handle errors we simply add the [`catch()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) when we call the `fetchCount()` function. 

  ```js
  fetchCount().catch(err => {
    console.error(err)
  });
  ```
  
## Putting It Together

Using the Fetch API is as simple as using a URL to fetch data and parsing the successful response into a JSON object. 

The sample code below demonstrates the following steps used to put the Fetch API to work in your code to retrieve data from the COVID Tracking API:

  * Using the `fetch()` method to retrieve data from the third-party library
  * Testing if the response is successful
  * Using the `body.json()` method to parse the response into a JSON object
  * Storing the data we need in variables
  * Using the variables to update the user interface or directly in our Javascript code

  ```js
  // Declare async function
  async function fetchCount() {
    // Use fetch() method to retrieve data from third-party API
    let response = await fetch('https://api.covidtracking.com/v1/us/current.json');
    
    // Test if response status is 200
    if (response.status === 200) {
      // Parse response as JSON Object
      let data = await response.json();
      
      //Store data in variable
      let total = data[0].deathIncrease;
      let deathTotal = data[0].death;
      let casesTotal = data[0].positive;
      let totalInICU = data[0].inIcuCurrently;
      let date = (data[0].date).toString();
      //Adds commas to numbers
      let numberTransform = new Intl.NumberFormat('en-US');
      
      //Display data in user interface
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

      // Use data in JavaScript to perform a function
      for (x=0; x < total; x++) {
        let div = document.createElement("div");
        let currentColor =  Math.floor(Math.random() * Math.floor(colors.length));
        div.style.backgroundColor = colors[currentColor];
        div.textContent="👤"
        document.getElementById("image-section").appendChild(div);
      }   
      document.getElementById("image-text").textContent = numberTransform.format(total);
      setTimeout(hideOverlay, 4250)
    } else {
      console.log("Status error returned: " + response.status);
    }
  }

  ```

  * A live version of this app is available [here](https://mischegoss.github.io/covid-visualizer/)

  * The JavaScript code used in this tutorial is also found in this repo [here](./assets/scripts.js)

 ## Additional Information

 For more information about the topics covered in the tutorial, please see the following resources:

 * [Introduction to Web APIS](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction)

 * [What are APIs?](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction#what_are_apis)

 * [Fetch Basic Concepts](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction#what_are_apis)

 * [Fetch API: Concepts and Usage](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

 * [Third-party APIs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Third_party_APIs)

 * [Async Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 
