import React, { useState , useEffect } from 'react';
import { helpHttp } from '../helpers/helpHttp';
import { CrudForm } from './CrudForm';
import { CrudTable } from './CrudTable';
import { Loader } from './Loader';
import { Message } from './Message';

const CrudApi = () => {
    const [db, setDb] = useState(null);
    const [dataToEdit, setDataToEdit] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    let api = helpHttp();
    let url = "http://localhost:5000/juegos";

    useEffect(() => {
      setLoading(true);
      helpHttp()
        .get(url)
        .then((res) => {
          if (!res.err) {
            setDb(res);
            setError(null);
          } else {
            setDb(null);
            setError(res);
          }

          setLoading(false);
        });
    }, [url]);
    

    const createData = ( data ) => {
        data.id = Date.now();

        let options = {
            body:data,
            headers: {"content-type":"application/json"},
        };

        api.post( url , options )
        .then( res => {
            console.log(res)
            if(!res.err){
                setDb([...db , res ]);
            }else{
                setError(res);
            }
        });
        
    }

    const updateData = ( data ) => {
        let endPoint = `${url}/${data.id}`;

        console.log(endPoint);
        
        let options = {
            body:data,
            headers: {"content-type":"application/json"},
        };

        api.put( endPoint , options )
        .then( res => {
            console.log(res)
            if(!res.err){
                let newData = db.map(el => el.id === data.id ? data : el );
                setDb( newData );
            }else{
                setError(res);
            }
        });
    }

    const deleteData = ( id ) => {

        let isDelete = window.confirm(
          `Estas seguro de borrar el registro: ${
            db.find((el) => el.id === id).name
          }`
        );

        if( isDelete ){

            let endPoint = `${url}/${id}`;

            let options = {
                headers: {"content-type":"application/json"},
            };

            api.del( endPoint , options )
            .then( res => {
                console.log(res)
                if(!res.err){
                    let newData = db.filter( el => el.id !== id );
                    setDb(newData);
                }else{
                    setError(res);
                }
            });
            
        }else{
            return;
        }
        
    }

  return (
    <div>
      <h2>Crud API</h2>
      <article className="grid-1-2">
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        {loading && <Loader />}
        {error && <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545"/>}
        {db && <CrudTable
          data={db}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
        />}
      </article>
    </div>
  );
}

export default CrudApi
