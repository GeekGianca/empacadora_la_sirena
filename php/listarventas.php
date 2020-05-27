<?php
include ('database.php');
$query = "SELECT detalle_compra.VENTAS_codigoventa as cod_venta, detalle_compra.fechacompra, detalle_compra.observacioncompra, ventas.cantidadcomprada, ventas.totalcompra FROM detalle_compra INNER JOIN ventas ON ventas.codigoventa = detalle_compra.VENTAS_codigoventa;";
$result = mysqli_query($connection, $query);
if (!$result){
    die('Query error!'.mysqli_error($connection));
}
$response = array();
while($row = mysqli_fetch_array($result)){
    $response[] = array(
        'codigo' => $row['cod_venta'],
        'fecha' => $row['fechacompra'],
        'observacion' => $row['observacioncompra'],
        'cantidad' => $row['cantidadcomprada'],
        'totalcompra' => $row['totalcompra']
    );
}
$jsonstring = json_encode($response);
echo $jsonstring;