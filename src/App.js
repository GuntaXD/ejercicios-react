import { getSelectionRange } from '@testing-library/user-event/dist/utils';
import React from 'react';
import CrudApp from './components/CrudApp';

function App() {
  return (
    <>
      <h1>Ejercicios con react</h1>
      <CrudApp/>
      <hr/>
    </>
  );
}

export default App;
