// Import stylesheets
import "./style.css";
// Import account details json
import Data from "./accountInfo.json";

window.onload = func();
// onload function
function func() {
  //JSON Data
  let { acctData, balance } = Data; // object destructuring whose result is same as below
  //   acctData = [   {
  //     "acctNum": "AAA-1234",
  //     "user": "Alice"
  //   },
  //   {
  //     "acctNum": "AAA-5231",
  //     "user": "Bob"
  //   },
  //   {
  //     "acctNum": "AAA-9921",
  //     "user": "Alice"
  //   },
  //   {
  //     "acctNum": "AAA-8191",
  //     "user": "Alice"
  //   }
  // ];
  // balance = {
  //   "AAA-1234": 4593.22,
  //   "AAA-5231": 0,
  //   "AAA-9921": 232142.5,
  //   "AAA-8191": 4344
  // }

  /**Method: performAcctData to handle the Question 2 logic
   * Description: Returns array of account number of users.
   * @params user: User name to be searched
   * @params sortBy: Accepts 'acctNum' or 'balance' to sort the Object
   * @params sortDirection: Accepts 'asc' or 'desc'
   */
  function performAcctData(user, sortBy, sortDirection) {
    //Merging the balance to respective account number.
    let mergeData = acctData.map(eachData => {
      return Object.assign({}, eachData, {
        balance: balance[eachData.acctNum]
      });
    });
    // console.log(">>>>Merged Data", mergeData);

    //Filter the object based on user, also returns all data when it is null.
    let filteredData = mergeData.filter(each => {
      return each.user === user || !user;
    });
    // console.log(">>>>Filtered Data", filteredData);

    //Sorting based on sortDirection & sortBy data. Default is 'asc' for filtered data.
    let sortData = sortBy ? sortBy : "acctNum";
    filteredData.sort(function(a, b) {
      if (a[sortData] > b[sortData]) return sortDirection === "desc" ? -1 : 1;
      if (b[sortData] > a[sortData]) return sortDirection === "desc" ? 1 : -1;
      return 0;
    });

    // console.log(">>>>Sorted Data", filteredData);

    //returning only acctnumber in array.
    let accountNo = filteredData.map(mapData => {
      return mapData["acctNum"];
    });

    return accountNo;
  }

  console.log(">Bob-List of Account number", performAcctData("Bob"));
  console.log(">Charlie-List of Account number", performAcctData("Charlie"));
  console.log(
    ">List-Sorted by account number",
    performAcctData("", "acctNum", "")
  );
  console.log(
    ">List of Alice Account number-Sorted in ascending order by balance",
    performAcctData("Alice", "balance", "asc")
  );
  // Changes related to Question 1.
  // start of prepopulating data in UI template 
  //created sample data to load the content in UI
  let data = [
    {
      acctNum: "IRA - 5200",
      cash: "5,763.36",
      rate: -0.08,
      variation: "8916.69",
      type: "loss"
    },
    {
      acctNum: "AAA - 1812",
      cash: "2,010,926.10",
      rate: +0.21,
      variation: "38,881.63",
      type: "gain"
    },
    {
      acctNum: "AAA - 3810",
      cash: "10,050,054.07",
      rate: 0.07,
      variation: "8916.69",
      type: "gain"
    }
  ];

// Iterating the data to append the DOM dynamically with class name. 
  for (let i = 0; i < data.length; i++) {
    domContent(i);
  }
  /**
   * method: To load the dynamic data.
   * @params 'i' will accept the number which is used as index.
   */

  function domContent(i) {
    let className = data[i].type === "gain" ? "green-text" : "red-text";
    let element = document.createElement("li");
    element.innerHTML =
      '<div class="left-context"><p>' +
      data[i].acctNum +
      '</p></div><div class="right-context"><p>&dollar;' +
      data[i].cash +
      "</p><p class=" +
      className +
      ">" +
      data[i].rate +
      "% / &dollar;" +
      data[i].variation +
      "</p></div>";
    document.getElementsByClassName("acct-list")[0].appendChild(element);
  }

//Click handler to load more data again. Used Closure to get the number of button clicks
  window.handler = () => {
    let clickCount = 0;
    return function() {
      if (clickCount < data.length) {
        domContent(clickCount);
        if(data.length && clickCount == data.length-1)
         document.getElementsByClassName("load-more")[0].innerHTML = "<p>You have reached the end</p>";
      }
      clickCount += 1;
      // return clickCount;
    };
  };
  //Adding click event to the link 
  document
    .getElementsByClassName("load-more")[0]
    .addEventListener("click", handler());
}
