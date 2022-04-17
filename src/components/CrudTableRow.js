import React from 'react'

export const CrudTableRow = ({el , setDataToEdit , deleteData}) => {

    const { name , rating , id } = el ;
  return (
    <tr>
      <td>{name}</td>
      <td>{rating}</td>
      <td>
        <button onClick={() => setDataToEdit(el)}>Editar</button>
        <button onClick={()=>{ deleteData(id)}}>Eliminar</button>
      </td>
    </tr>
  );
}
