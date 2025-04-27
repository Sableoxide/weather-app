<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class Weather extends Controller
{   
    public function weatherTodayand3DayForecast(Request $request) {
        $api_key = config("services.open_weather_map.key");
        #fetch query values
        $longitude = $request->query('lon');
        $latitude = $request->query('lat');
        

        $url = "api.openweathermap.org/data/2.5/forecast/daily?lat=$latitude&lon=$longitude&cnt=4&units=metric&appid=$api_key";

        try {
            $response = Http::timeout(3)->get($url);
            if ($response->successful()) {
                $json_response = json_decode($response->body(), true);
                if (empty($json_response)) {
                    return response()->json(['message' => 'forecast not found'],404); #return if response is empty
                } else {
                    $weather_data = [];
                    for ($i = 0; $i < 4; $i++) {
                        $weather_data[] = [ #get only important info from response
                            "timestamp" => $json_response["list"][$i]["dt"],
                            "city" => $json_response["city"]["name"],
                            "temp"=> $json_response["list"][$i]["temp"]["day"],
                            "humidity"=> $json_response["list"][$i]["humidity"],
                            "weather"=> $json_response["list"][$i]["weather"][0]["main"],
                            "wind_direction"=> $json_response["list"][$i]["deg"],
                            "wind_speed"=> $json_response["list"][$i]["speed"],
                            "icon_code"=> $json_response["list"][$i]["weather"][0]["icon"], #note to self: the icons from openweathermap are trash!
                    ];}
                    return [ #return the important info
                        "message" => "API request success",
                        "status" => $response->status(),
                        "body" => $weather_data,
                    ];
                }
            } else {
                return [ # if the api returns error
                    "error" => "API request not SUCCESSFUL",
                    "status" => $response->status(),
                    "body" => $response
                ];
            }

        } catch (\Exception $e) { #if the api call fails
            return [
                "error" => "API call failed",
                "message" => $e->getMessage()
            ];
        }
    }

}
