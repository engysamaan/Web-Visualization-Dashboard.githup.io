    
if (inputValue == String){
        var selectCity = ufoData.filter(row => row.city === inputValue);
        console.log(selectCity);
        buildTable(selectCity);
    } else if (inputValue == Date){
        var selectDataTime = ufoData.filter(row => row.datetime === inputValue);
        console.log(selectDataTime);
        buildTable(selectDataTime);