import React from 'react';

import Button from '../Common/Button';

const Login = (props) => (
  <div className="grid grid-rows-3 grid-flow-col gap-4 p-5">
    <div className="row-span-3 bg-red-200">Hi</div>
    <div className="row-span-1 col-span-2 bg-teal-400">Hi</div>
    <div className="row-span-2 col-span-2 bg-green-600">hi</div>

    <div className="custom-css-style">
      <h1>salam</h1>
    </div>

    <Button onClick={() => console.log('button')} type="primary">
      Button
    </Button>
  </div>
);

export default Login;
