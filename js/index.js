function mostrarUsuarios() {
    const contenido = usuarios.map(usuario => {
        // console.log(usuario.id);
        return `<tr>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.role}</td>
                    <td>
                      <button type="button" onclick="mostrarDetallesUsuario('${usuario.id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ModalUsuario">
                        Ver detalles
                      </button>
                      <button onclick="deleteItem('${usuario.id}')" class="btn btn-danger mx-2">Borrar</button>
                      <button onclick="updateItem('${usuario.id}')" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#ModalEditarUsuario">Editar</button>
                      </td>
                </tr>`
    })
    console.log(contenido.join(''));
    const allHtmlcontent = contenido.join('');
    tabla.innerHTML = allHtmlcontent;
}
