import React from 'react';
import { MTContext } from '..';

function useMTContext() {
  const context = React.useContext(MTContext);

  return context;
}

export { useMTContext };
