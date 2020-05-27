<?php
include ('database.php');
if (isset($_POST['datoid'])){
    $idlote = $_POST['datoid'];
    $query = "DELETE FROM estado_lote WHERE codigoestado='$idlote'";
    $result = mysqli_query($connection, $query);
    if (!$result){
        die('Query Eliminar Error '.mysqli_error($connection));
    }
    echo "Estado de lote eliminado correctamente!";
}