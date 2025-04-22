<?php

use App\Http\Controllers\Geocoding;
use App\Http\Controllers\Weather;
use Illuminate\Support\Facades\Route;

Route::get('/weather-data', [Weather::class, 'weatherTodayand3DayForecast']);

Route::get('/location/{city}', [Geocoding::class, 'locationCoordinates']);