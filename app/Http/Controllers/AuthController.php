<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\User;
use Carbon\Carbon;
use Auth;

class AuthController extends Controller
{
    //
    public function signup(Request $request) {
        $validator = Validator::make($request->all(), [ 
            'name'      => 'required|string',
            'email'     => 'required|string|email|unique:users',
            'password'  => 'required',
        ]);

        if ($validator->fails()) { 
            return response()->json([
                'status'    => 'error',
                'message'   => $validator->errors()
            ], 422); 
        }else{
            $user_data = [
                'name'      => $request->name,
                'email'     => $request->email,
                'password'  => bcrypt($request->password)
            ];
            $user = User::create($user_data);
            return response()->json([
                'status'   => 'success',
                'message'  => 'Selamat, akun anda berhasil dibuat',
            ], 200);
        }

    }

    public function login(Request $request) {
        if(Auth::attempt([
            'email'     => $request->email,
            'password'  => $request->password])) 
            {
            $user = Auth::user();
            $tokenResult = $user->createToken('MyApp');
            $token_data = $tokenResult->accessToken;
            return response()->json([
                'status'    => 'success',
                'message'   => 'login berhasil',
                'token'     => $token_data
            ], 200);
        }else{
            return response()->json([
                'status'  => 'error',
                'message' => 'login gagal'
            ], 422);
        }  

    }

    public function logout(Request $request) {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Logout'
        ]);       
    }

    public function details() 
    { 
        $data = Auth::user(); 
        return response()->json([
            'data'      => $data,  
        ], 200); 
    } 

}
