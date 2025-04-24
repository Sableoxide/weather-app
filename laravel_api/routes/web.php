<?php

use App\Http\Controllers\Geocoding;
use App\Http\Controllers\Weather;
use Illuminate\Support\Facades\Route;

#check Http/Controllers/Weather.php for its implementation
Route::get('/weather-data', [Weather::class, 'weatherTodayand3DayForecast']);

##check Http/Controllers/Geocoding.php for its implementation
Route::get('/location/{city}', [Geocoding::class, 'locationCoordinates']);