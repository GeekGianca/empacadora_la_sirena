<?php
include ('database.php');
if (isset($_POST['c_estado'])){
    $codigo = $_POST['c_estado'];
    $estado = $_POST['e_lote'];
    $observacion =$_POST['observacion'];
    $lote =$_POST['c_lote'];
    $query = "INSERT INTO `estado_lote`(`codigoestado`, `estadolote`, `observacion`, `LOTE_idlote`) VALUES ('$codigo','$estado','$observacion','$lote');";
    $result = mysqli_query($connection, $query);
    if (!$result){
        echo $query;
        die('Query Fallo!');
    }
    echo "Estado de lote registrado exitosamente!";
}