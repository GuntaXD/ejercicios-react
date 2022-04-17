import React, { useState } from 'react';
import { CrudForm } from './CrudForm';
import { CrudTable } from './CrudTable';

const initialDb = [
    {
      id:1,
      name: "Stardew valley",
      rating: "87",
    },
    {
      id:2,
      name: "Noita",
      rating: "76",
    },
    {
      id:3,
      name: "Minecraft",
      rating: "93",
    },
    {
      id:4,
      name: "Factorio",
      rating: "90",
    },
    {
      id:5,
      name: "Forager",
      rating: "78",
    },
  ]

const CrudApp = () => {
    const [db, setDb] = useState(initialDb);
    const [dataToEdit, setDataToEdit] = useState(null)

    const createData = ( data ) => {
        data.id = Date.now();
        setDb([...db , data ]);
    }

    const updateData = ( data ) => {
        let newData = db.map(el => el.id === data.id ? data : el );
        setDb( newData );
    }

    const deleteData = ( id ) => {
        let isDelete = window.confirm(
          `Estas seguro de borrar el registro: ${
            db.find((el) => el.id === id).name
          }`
        );

        if( isDelete ){
            let newData = db.filter( el => el.id !== id );
            setDb(newData);
        }else{
            return;
        }
        
    }

  return (
    <div>
      <h2>CrudApp</h2>
      <article className='grid-1-2'>
      <CrudForm
        createData={createData}
        updateData={updateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
      />
      <CrudTable
        data={db}
        setDataToEdit={setDataToEdit}
        deleteData={deleteData}
      />
      </article>
    </div>
  );
}

export default CrudApp