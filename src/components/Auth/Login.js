import React from 'react';
import Button from '../Common/Button';
import Checkbox from '../Common/Checkbox';
import { DownloadOutlined } from '@ant-design/icons';

const Login = (props) => (
  <div className="grid grid-rows-3 grid-flow-col gap-4 p-5 ">
    <div className="row-span-3 bg-red-200">Hi</div>
    <div className="row-span-1 col-span-2 bg-teal-400">Hi</div>
    <div className="row-span-2 col-span-2 bg-green-600">hi</div>

    <div className="custom-css-style">
      <h1>salam</h1>
    </div>
    <Button onClick={() => console.log('button')}>Button</Button>
    <Button onClick={() => console.log('button')} ghost icon={<DownloadOutlined />}>
      Button
    </Button>
    <Button onClick={() => console.log('button')} gray icon={<DownloadOutlined />}>
      Button
    </Button>
    <Button onClick={() => console.log('button')} gray icon={<DownloadOutlined />} reverse>
      Button
    </Button>
    <Button onClick={() => console.log('button')} light icon={<DownloadOutlined />}>
      Button
    </Button>
    <Button onClick={() => console.log('button')} type="link" icon={<DownloadOutlined />}>
      Button
    </Button>
    <Button
      onClick={() => console.log('button')}
      type="primary"
      icon={<DownloadOutlined />}
      reverse
      ghost
      light
    >
      Button
    </Button>

    <Checkbox onChange={(e) => console.log('checked')}></Checkbox>
    <Checkbox onChange={(e) => console.log('checked')}></Checkbox>
  </div>
);

export default Login;
