// a place to test your components
import React from 'react';
import Button from './Common/Button';
import {
  DownloadOutlined,
  DeleteOutlined,
  IssuesCloseOutlined,
  SearchOutlined,
} from '@ant-design/icons';

// FIX : put related import statements together
import Input from './Common/Input';

const Login = (props) => (
  <div className="grid grid-rows-3 grid-flow-col gap-4 p-5">
    <Button onClick={() => console.log('button')}>Button</Button>
    <Button onClick={() => console.log('button')} type="gray" ghost icon="DownloadOutlined">
      Button
    </Button>
    {/* <Button onClick={() => console.log('button')} gray icon={<DownloadOutlined />}>
      Button
    </Button>
    <Button onClick={() => console.log('button')} gray icon={<DownloadOutlined />} reverse>
      XXX
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
    <Input
      placeholder={'placeholder'}
      suffix={<DeleteOutlined />}
      prefix={<IssuesCloseOutlined />}
    />
    <Input
      placeholder={'placeholder'}
      suffix={<DeleteOutlined />}
      prefix={<IssuesCloseOutlined />}
      gray
    /> */}
    {/* <Input placeholder={'placeholder'} />
    <Input
      placeholder={'placeholder'}
      suffix={
        <Button onClick={() => console.log('button')} icon={<SearchOutlined />} rounded></Button>
      }
    /> */}
  </div>
);

export default Login;
