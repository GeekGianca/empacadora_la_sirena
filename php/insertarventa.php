<?php
include('database.php');
if (isset($_POST['c_venta'])) {
    $c_venta = $_POST['c_venta'];
    $c_producto = $_POST['c_producto'];
    $c_comprada = $_POST['c_comprada'];
    $t_compra = $_POST['t_compra'];
    $observacion = $_POST['observacion'];
    $squery = "INSERT INTO `ventas`(`cantidadcomprada`, `totalcompra`) VALUES ('$c_comprada','$t_compra');";
    $resultQuery =mysqli_query($connection, $squery);
    echo $squery;
    if (!$resultQuery){
        die('Query Fallo!');
    }
    $query = "INSERT INTO `detalle_compra`(`VENTAS_codigoventa`, `PRODUCTO_codigoproducto`, `fechacompra`, `observacioncompra`) VALUES ((SELECT ventas.codigoventa FROM ventas WHERE ventas.cantidadcomprada = '$c_comprada' AND ventas.totalcompra = '$t_compra'),'$c_producto',(SELECT NOW()),'$observacion');";
    $result = mysqli_query($connection, $query);
    echo $query;
    if (!$result) {
        die('Query Fallo en detalle!');
    }

    echo "Venta registrada exitosamente!";
}