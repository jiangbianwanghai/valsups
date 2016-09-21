<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

use Illuminate\Http\Request;
use Jiangbianwanghai\BankLoan\BankLoan;

$app->get('/', function () use ($app) {
    return view('index');
});
$app->post('/post', function (Request $request) {
    $method = $request->input('method');
    $year = $request->input('year');
    $total = $request->input('total');
    $rate = $request->input('rate');
    $bl = new BankLoan(['loanAmount' => $total*10000, 'year' => $year]);
    //var_dump($bl->getEPP());
    return response()->json([
        'errors' => false,
        'res' => [
            'elp' => $bl->getELP(),
            'epp' => $bl->getEPP()
        ]
    ]);
});
//$app->get('/', 'ExampleController@index');
