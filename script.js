$("#seeWeather").hide();
const apiKey = "50f7877f4da35ee50991c11f2e909760"

async function getWeather(city){

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
const result = await fetch(weatherUrl)
const weather = await result.json()
return weather
}

$("button").click( async function(e){
    e.preventDefault()


        let city = $("#city").val()


const weatherResults = await getWeather(city)

$("#city").text(`city`)

    $("#seeWeather").show();

    $("#City").text( `${weatherResults.name}`  );
 $("#Temperature").text( `Current temp : ${weatherResults.main.temp} C  Lowest: ${weatherResults.main.temp_min} C   Highest: ${weatherResults.main.temp_max} `  );
 $("#wind").text( `Speed : ${weatherResults.wind.speed} km/h`  );
 
 $("#clouds").text( `Clouds: ${weatherResults.weather[0].description}`  );
 

 
    console.log("hello world")
});

