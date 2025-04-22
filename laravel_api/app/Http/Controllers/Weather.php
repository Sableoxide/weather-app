<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class Weather extends Controller
{   
    public function weatherToday(Request $request) {
        $api_key = config("services.open_weather_map.key");
        $longitude = $request->query('lon');
        $latitude = $request->query('lat');
        $url = "api.openweathermap.org/data/2.5/forecast/daily?lat=$latitude&lon=$longitude&cnt=1&appid=$api_key";

        try {
            $response = Http::timeout(3)->get($url);
            if ($response->successful()) {
                if (empty(json_decode($response->getBody(), true))) {
                    return response()->json(['message' => 'forecast not found'],404);
                } else {
                    return [
                        "message" => "API request success",
                        "status" => $response->status(),
                        "body" => $response->body()
                    ];
                }
            } else {
                return [
                    "error" => "API request not SUCCESSFUL",
                    "status" => $response->status(),
                    "body" => $response->body()
                ];
            }

        } catch (\Exception $e) {
            return [
                "error" => "API call failed",
                "message" => $e->getMessage()
            ];
        }
    }
}
