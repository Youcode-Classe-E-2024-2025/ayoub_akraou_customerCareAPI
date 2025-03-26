<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\TicketController;
use App\Http\Controllers\API\ResponseController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

