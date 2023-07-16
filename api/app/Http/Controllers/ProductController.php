<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function addProduct(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:855',
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $imageFile) {
                $path = $imageFile->store('/images/resource', ['disk' => 'my_files']);

                $product->images()->create([
                    'url' => $path,
                ]);
            }
        }

        return response()->json(['id' => $product->id], 201);
    }

    public function showProduct($id)
    {
        $product = Product::with('images')->findOrFail($id);

        return response()->json($product);
    }
}
