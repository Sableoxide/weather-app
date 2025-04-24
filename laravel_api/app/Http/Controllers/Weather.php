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
        $day_cnt = $request->query('cnt');

        $url = "api.openweathermap.org/data/2.5/forecast/daily?lat=$latitude&lon=$longitude&cnt=4&appid=$api_key";

        try {
            $response = Http::timeout(3)->get($url);
            if ($response->successful()) {
                $json_response = json_decode($response->body(), true);
                if (empty($json_response)) {
                    return response()->json(['message' => 'forecast not found'],404); #return if response is empty
                } else {
                    $weather_data = [ #get only important info from response
                        "timestamp" => $json_response["list"][$day_cnt]["dt"],
                        "city" => $json_response["city"]["name"],
                        "temp"=> $json_response["list"][$day_cnt]["temp"]["day"],
                        "humidity"=> $json_response["list"][$day_cnt]["humidity"],
                        "weather"=> $json_response["list"][$day_cnt]["weather"][0]["main"],
                        "wind_direction"=> $json_response["list"][$day_cnt]["deg"],
                        "wind_speed"=> $json_response["list"][$day_cnt]["speed"],
                        "icon_url"=> "https://openweathermap.org/img/wn/".$json_response["list"][$day_cnt]["weather"][0]["icon"]."@2x.png",
                    ];
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
                    "body" => $response->body()
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
