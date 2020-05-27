<?php
include ('database.php');
$id = $_POST['cod_est'];
$query = "SELECT * FROM `estado_lote` WHERE `codigoestado` = '$id';";
$result = mysqli_query($connection, $query);
if (!$result){
    die('Error de seleccion '.mysqli_error($connection));
}
$response = array();
while ($row = mysqli_fetch_array($result)){
    $response[] = array(
        'codigo_estado' => $row['codigoestado'],
        'estado_lote' => $row['estadolote'],
        'observacion' => $row['observacion'],
        'cod_lote' => $row['LOTE_idlote']
    );
};
$respo = json_encode($response[0]);
echo $respo;
