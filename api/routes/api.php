<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::post('addProduct', [ProductController::class, 'addProduct']);

Route::get('/products/{id}', [ProductController::class, 'showProduct']);
