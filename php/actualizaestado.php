<?php
include('database.php');
$codigo = $_POST['c_estado'];
$estado = $_POST['e_lote'];
$observacion =$_POST['observacion'];
$lote =$_POST['c_lote'];

$query = "UPDATE `estado_lote` SET `estadolote`= '$estado',`observacion`='$observacion',`LOTE_idlote`='$lote' WHERE `codigoestado` = '$codigo';";
$result = mysqli_query($connection, $query);
if (!$result){
    die('Actualizado error '.mysqli_error($connection));
}
echo "Actualizacion correcta";