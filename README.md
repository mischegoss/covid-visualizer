# Use the JavaScript Fetch API to Get COVID-19 Data

The Fetch API is a simple way to make web requests and handle responses. In this tutorial, we will use Fetch API to make a request to a third-party API to retrieve COVID-19 data.

## Prerequisites

For this tutorial, you should be comfortable with with the basics of JavaScript and have some understanding of HTML and CSS.


## What is an API? 

APIs or Application Programming Interfaces allow us to perform complex functions or retrieve data with only a few lines of code. 

We will use two kinds of APIs to retrieve the COVID-19 data.  

  * __Browser-Level APIs__ These APIs are built into the browser and allow us to implement complex functionality easily. We will use the Fetch API's `fetch()` method to retrieve our data. 

  * __Third-Party APIs__ These APIs are developed by a third-party source and can be used to access functionality or data. We will access COVID-19 data from the [COVID Tracking Project API](https://covidtracking.com/data/api).

## Using the COVID Tracking Project API

To interact with a third-party API, it is important to look [directly at the docs](https://covidtracking.com/data/api).

The COVID Tracking Project API does not require a key. Instead, we fetch data directly using the following URL:

  ```
  https://api.covidtracking.com/v1/us/current.json
  ```

In the next step, we will use this URL with our Fetch API to retrieve the data. 

## Using the Fetch API

We start by creating a function to hold our fetch functionality. Since the Fetch API returns a promise, we use [`async/await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) to simplify the syntax. 


  ```js
  async function fetchCount() {}
  ```

Inside the `fetchCount()` function, we use the `fetch()` method to retrieve data from the COVID Tracking API and store the results in a variable. 

  ```js
  let response = await fetch('https://api.covidtracking.com/v1/us/current.json');
  ```

We store the data returned in a variable `data` and use the [`json()` method](https://developer.mozilla.org/en-US/docs/Web/API/Body/json) to parse the response text as `JSON`. This will allow use to easily use the retrieved data on our site. 

  ```js
   let data = await response.json();
  ```

To use the data, we store the values found in the `data` object in variables. 

  ```js
  let total = data[0].deathIncrease;
  let deathTotal = data[0].death;
  let casesTotal = data[0].positive;
  let totalInICU = data[0].inIcuCurrently;
  let date = (data[0].date).toString();
  ```

## Handling Unsuccessful Responses

When a response is successful, the status of `200` is returned. To prevent any issues, we use an `if` statement to test if the `200` status was returned. 

  ```js
  if (response.status === 200) {//Code to store and manipulate retrieved data}
  ```

## Updating our User Interface

To display the data to our users, we use the `.getElementById()` method and the `textContent` property.

The `.getElementbyId()` method selects an HTML element by id.

  * Here is the element we want to select in the HTML.

    ```html
    <p class="overlay-text" id="death-total"></p>
    ```

  * We use the HTML's `id` attribute to select the element using `.getElementById()`.

    ```js
    document.getElementById("death-total")
    ```

We use the `textContent` property to set the content of the selected HTML property to the value we want to display. 

  ```js
  document.getElementById("death-total").textContent = deathTotal;
  ```

Sometimes, the data -- including numbers -- may need to be reformatted to display in a user-friendly manner. To format a date, we use the [Intl.NumberFormat object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).

  ```js
  let numberTransform = new Intl.NumberFormat('en-US'); 
  document.getElementById("death-total").textContent = numberTransform.format(deathTotal);
  ```


  