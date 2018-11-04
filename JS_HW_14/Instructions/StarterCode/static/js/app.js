// from data.js
var ufoData = data;

// YOUR CODE HERE!

function buildTable(a) {
    var tbody = d3.select("tbody");
    tbody.html(" ")
    a.forEach((Data) => {
        var row = tbody.append("tr");
        Object.values(Data).forEach((value)=> {
            var cell = row.append("td");
            cell.text(value);   
        });
    });     
}
buildTable(ufoData);

    var filter = d3.select("#filter-btn");

    filter.on("click", function() {       
        d3.event.preventDefault();
        //d3.event.target
        var inputElement= d3.select(".form-control");
        var inputValue = inputElement.property("value");
        //console.log(inputValue);
        //var selectDataTime = 
        var selectDataTime = ufoData.filter(row => row.datetime === inputValue);
        console.log(selectDataTime);
        console.log(inputValue);
        buildTable(selectDataTime);


        // var selectCity = ufoData.filter(row => row.city === inputValue);
        // console.log(selectCity);

        // var selectState = ufoData.filter(row => row.state === inputValue);
        // console.log(selectState);

        // var selectCountry = ufoData.filter(row => row.country === inputValue);
        // console.log(selectCountry);

        // var selectShape = ufoData.filter(row => row.shape === inputValue);
        // console.log(selectShape);
      
        



    });






    










