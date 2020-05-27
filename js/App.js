$(document).ready(function () {
    //jquery -> ajax-> Peticiones sin recargar pagina
    let edita = false;
    let editaEstado = false;

    obtenerdatos();

    obtenerproductos();

    obtenerestados();

    obtenercodigos();

    obtenerventas();

    $('#resultado').hide();

    $('#search').keyup(function (e) {
        if ($('#search').val()) {
            let search = $('#search').val();
            $.ajax({
                url: 'php/lote-buscar.php',
                type: 'POST',
                data: {search},
                success: function (response) {
                    let datos = JSON.parse(response);
                    let template = '';
                    datos.forEach(dato => {
                        template += `<li>${dato.tipolote}</li>`
                    });
                    $('#container').html(template);
                    $('#resultado').show();
                }
            });
        } else {
            $('#resultado').hide();
        }
    });
    //End Search
    $('#lote-form').submit(function (e) {
        console.log("sending...");
        const posDatos = {
            idlote: $('#idlote').val(),
            tipolote: $('#tipolote').val(),
            cantidad: $('#cantidad').val()
        };
        let url = edita == false ? 'php/insertarlote.php' : 'php/actualizalote.php';
        console.log(url);
        $.post(url, posDatos, function (response) {
            console.log(response);
            obtenerdatos();
            $('#lote-form').trigger('reset');
            edita = false;
        });
        e.preventDefault();
    });

    function obtenerestados() {
        $.ajax({
            url: 'php/listarestados.php',
            type: 'GET',
            success: function (response) {
                let datos = JSON.parse(response);
                let template = '';
                let tempselect = '';
                datos.forEach(dato => {
                    let estado = dato.estado == 1 ? 'Disponible' : 'No disponible';
                    template += `
                    <tr idestado="${dato.codigo}">
                        <td class="text-center">${dato.codigo}</td>
                        <td class="text-center">${estado}</td>
                        <td class="text-center">${dato.observacion}</td>
                        <td class="text-center">${dato.idlote}</td>
                        <td class="text-center">
                            <button class="estado-editar btn btn-warning btn-sm">
                                Editar
                            </button>
                            <button class="estado-eliminar btn btn-danger btn-sm">
                                Eliminar
                            </button>
                        </td>
                    </tr>`;
                });
                $('#datosestado').html(template);
                $('#cod_lote').html(tempselect);
            }
        });
    }

    function obtenercodigos() {
        $.ajax({
            url: 'php/listalotes.php',
            type: 'GET',
            success: function (response) {
                let datos = JSON.parse(response);
                let tempselect = '';
                tempselect += `<option selected>Seleccionar...</option>`;
                datos.forEach(dato => {
                    tempselect += `<option>${dato.idlote}</option>`;
                });
                $('#cod_lote').html(tempselect);
            }
        });
    }

    function obtenerdatos() {
        $.ajax({
            url: 'php/listalotes.php',
            type: 'GET',
            success: function (response) {
                let datos = JSON.parse(response);
                let template = '';
                let tempselect = '';
                datos.forEach(dato => {
                    template += `
                    <tr idlotedato="${dato.idlote}">
                        <td class="text-center">${dato.idlote}</td>
                        <td class="text-center">
                            <a href="#" class="dato-cod">${dato.codigolote}</a>
                        </td>
                        <td class="text-center">${dato.tipolote}</td>
                        <td class="text-center">${dato.cantidadproductos}</td>
                        <td class="text-center">
                            <button class="dato-eliminar btn btn-danger btn-sm">
                                ELIMINAR
                            </button>
                        </td>
                    </tr>`;
                    tempselect += `<option>${dato.idlote}</option>`;
                });
                $('#datoslote').html(template);
                $('#clote').html(tempselect);
            }
        });
    }

    function obtenerventas(){
        $.ajax({
            url: 'php/listarventas.php',
            type: 'GET',
            success: function (response) {
                let datos = JSON.parse(response);
                let template = '';
                datos.forEach(dato => {
                    template += `
                    <tr codigo="${dato.codigo}">
                        <td class="text-center">${dato.codigo}</td>
                        <td class="text-center">${dato.fecha}</td>
                        <td class="text-center">${dato.observacion}</td>
                        <td class="text-center">${dato.cantidad}</td>
                        <td class="text-center">${dato.totalcompra}</td>
                    </tr>`;
                });
                $('#datosventas').html(template);
            }
        });
    }

    $(document).on('click', '.estado-editar', function () {
        let element = $(this)[0].parentElement.parentElement;
        let cod_est = $(element).attr('idestado');
        $.post('php/obtenerestado.php', {cod_est}, function (response) {
            const dato = JSON.parse(response);
            console.log(dato);
            $('#c_estado').val(dato.codigo_estado);
            $('#o_lote').val(dato.observacion);
            editaEstado = true;
        });
    });

    $(document).on('click', '.dato-eliminar', function () {
        if (confirm('Estas seguro de eliminar el lote?')) {
            let element = $(this)[0].parentElement.parentElement;
            let datoid = $(element).attr('idlotedato');
            $.post('php/eliminarlote.php', {datoid}, function (response) {
                obtenerdatos();
            });
        }
    });

    $(document).on('click', '.estado-eliminar', function () {
        if (confirm('Estas seguro de eliminar el estado?')) {
            let element = $(this)[0].parentElement.parentElement;
            let datoid = $(element).attr('idestado');
            $.post('php/eliminarestado.php', {datoid}, function (response) {
                obtenerestados();
                obtenercodigos();
            });
        }
    });

    $(document).on('click', '.dato-cod', function () {
        let element = $(this)[0].parentElement.parentElement;
        let codigo = $(element).attr('idlotedato');
        $.post('php/uniquelote.php', {codigo}, function (response) {
            const dato = JSON.parse(response);
            $('#idlote').val(dato.idlote);
            $('#tipolote').val(dato.tipolote);
            $('#cantidad').val(dato.cantidadproducto);
            $('loteid').val(dato.idlote);
            edita = true;
        });

    });

    function obtenerproductos() {
        $.ajax({
            url: 'php/listaproductos.php',
            type: 'GET',
            success: function (response) {
                let datos = JSON.parse(response);
                let template = '';
                let selectionTemplate = '';
                console.log(datos);
                datos.forEach(dato => {

                    template += `
                    <tr cproducto="${dato.codigoproducto}" class="text-center">
                        <td>${dato.codigoproducto}</td>
                        <td>
                            <a href="#" class="p-nombre">${dato.nombreproducto}</a>
                        </td>
                        <td>${dato.cantidadlitros}</td>
                        <td>${dato.cantidadlitrosporunidad}</td>
                        <td>${dato.LOTE_idlote}</td>
                        <td>
                            <button class="p-eliminar btn btn-danger btn-sm">
                                ELIMINAR
                            </button>
                        </td>
                    </tr>
                `;
                    selectionTemplate += `<option>${dato.codigoproducto}</option>`;
                });
                $('#datosproductos').html(template);
                $('#c_producto').html(selectionTemplate);
            }
        });
    }

    $('#producto-form').submit(function (e) {
        let select = document.getElementById("clote");
        let val = select.options[select.selectedIndex].value;
        const posDatos = {
            cproducto: $('#cproducto').val(),
            nproducto: $('#nproducto').val(),
            cantidad: $('#cantidad').val(),
            cantidadlu: $('#cantidadlu').val(),
            clote: val
        };
        let url = edita == false ? 'php/insertarproducto.php' : 'php/actualizaproducto.php';
        $.post(url, posDatos, function (response) {
            console.log(response);
            obtenerproductos();
            $('#producto-form').trigger('reset');
            edita = false;
        });
        e.preventDefault();
    });

    $('#venta-form').submit(function (e) {
        let select = document.getElementById("c_producto");
        let val = select.options[select.selectedIndex].value;
        console.log(val);
        const datosPost = {
            c_venta: $('#c_venta').val(),
            c_producto: val,
            c_comprada: $('#c_comprada').val(),
            t_compra: $('#t_compra').val(),
            observacion: $('#observacion').val()
        };
        console.log(datosPost);
        $.post('php/insertarventa.php', datosPost, function (response) {
            console.log(response);
            obtenerventas();
            $('#venta-form').trigger('reset');
        });
        e.preventDefault();
    });

    $('#estado-form').submit(function (e) {
        let selection = document.getElementById("cod_lote");
        let e_lote = document.getElementById("e_lote");
        if (selection.selectedIndex > 0 && e_lote.selectedIndex > 0) {
            let cod_lote = selection.options[selection.selectedIndex].value;
            let e_lote_selected = e_lote.options[e_lote.selectedIndex].value;
            const dataPost = {
                c_estado: $('#c_estado').val(),
                e_lote: e_lote_selected == 'Disponible' ? 1 : 0,
                observacion: $('#o_lote').val(),
                c_lote: cod_lote
            };
            console.log(dataPost);
            let url = (editaEstado == false) ? 'php/insertarestadolote.php' : 'php/actualizaestado.php';
            $.post(url, dataPost, function (response) {
                console.log(response);
                $('#estado-form').trigger('reset');
                obtenerestados();
                obtenercodigos();
            });
        }

        e.preventDefault();
    });

    $(document).on('click', '.p-nombre', function () {
        let element = $(this)[0].parentElement.parentElement;
        let codigo = $(element).attr('cproducto');
        $.post('php/uniqueproducto.php', {codigo}, function (response) {
            const dato = JSON.parse(response);
            $('#cproducto').val(dato.codigoproducto);
            $('#nproducto').val(dato.nombreproducto);
            $('#cantidad').val(dato.cantidadlitros);
            $('#cantidadlu').val(dato.cantidadlitrosporunidad);
            $('#clote').val(dato.LOTE_idlote);
            edita = true;
        });

    });
});