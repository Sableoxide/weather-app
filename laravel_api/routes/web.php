<?php

use App\Http\Controllers\Geocoding;
use App\Http\Controllers\Weather;
use Illuminate\Support\Facades\Route;

#check Http/Controllers/Weather.php for its implementation
Route::get('/api/weather-data', [Weather::class, 'weatherTodayand3DayForecast']);

##check Http/Controllers/Geocoding.php for its implementation
Route::get('/api/location/{city}', [Geocoding::class, 'locationCoordinates']);