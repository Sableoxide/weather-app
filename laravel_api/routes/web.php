<?php

use App\Http\Controllers\Geocoding;
use App\Http\Controllers\Weather;
use Illuminate\Support\Facades\Route;

Route::get('/today-forecast', [Weather::class, 'weatherToday']);

Route::get('/location/{city}', [Geocoding::class, 'locationCoordinates']);