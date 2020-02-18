let locationData = {};
fetch("./data/location.json").then(res => res.json()).then(data => {
    locationData = data
})
fetch("./data/ncovdata.json").then(res => res.json()).then(data => {
    let cityData = [];
    data.results.forEach(item => {
        if (item.countryName === "中国") {
            item.cities.forEach(city => {
                // console.log(city)
                let singleCity = {};
                singleCity.cityName = city.cityName;
                singleCity.currentConfirmedCount = city.currentConfirmedCount;
                cityData.push(singleCity);
            })
        }
    });
    return cityData
}).then(cityData =>{
    let combinedData=[]
    cityData.forEach(city=>{
        let key = locationData[city.cityName];
        if(key){
            let item = {
                cityName:'',
                currentConfirmedCount:0,
                lon:0,
                lat:0
            }
            item.cityName = city.cityName;
            item.currentConfirmedCount = city.currentConfirmedCount;
            item.lon = key.x;
            item.lat = key.y;
            combinedData.push(item);
        }
    })
    console.log(combinedData)
})

