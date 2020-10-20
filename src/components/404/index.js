import React from 'react';
import { Result } from 'antd';

import Button from '../Common/Button';

const NotFound = () => (
  <div className="flex flex-row min-h-screen justify-center items-center">
    <Result
      className="w-1/2"
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button className=" inline-flex mx-auto" href="/" text="Back Home" />}
    />
  </div>
);

export default NotFound;
