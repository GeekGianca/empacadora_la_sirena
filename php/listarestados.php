<?php
include ('database.php');
$query = "SELECT * FROM ESTADO_LOTE;";
$result = mysqli_query($connection, $query);
if (!$result){
    die('Query error!'.mysqli_error($connection));
}
$response = array();
while($row = mysqli_fetch_array($result)){
    $response[] = array(
        'codigo' => $row['codigoestado'],
        'estado' => $row['estadolote'],
        'observacion' => $row['observacion'],
        'idlote' => $row['LOTE_idlote']
    );
}
$jsonstring = json_encode($response);
echo $jsonstring;