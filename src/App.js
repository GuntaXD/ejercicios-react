import { getSelectionRange } from '@testing-library/user-event/dist/utils';
import React from 'react';
import CrudApi from './components/CrudApi';
import CrudApp from './components/CrudApp';

function App() {
  return (
    <>
      <h1>Ejercicios con react</h1>
      <hr/>
      <CrudApi/>
      <hr/>
      <CrudApp/>
      <hr/>
    </>
  );
}

export default App;
