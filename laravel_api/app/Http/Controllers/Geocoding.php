<?php

namespace App\Http\Controllers;

#use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class Geocoding extends Controller
{
    public function locationCoordinates(string $city) {
        $api_key = config("services.open_weather_map.key");
        if (!$api_key) {
            return 'MISSING API KEY';
        }
        $url = "http://api.openweathermap.org/geo/1.0/direct?q=" .urlencode($city). "&limit=1&appid=". urlencode($api_key);

        try {
            $response = Http::timeout(3)->get($url);
            if ($response->successful()) {
                if (empty(json_decode($response->getBody(), true))) {
                    return response()->json(['message' => 'location not found'],404);
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
