// a place to test your components
import React from 'react';
import { DeleteOutlined, IssuesCloseOutlined } from '@ant-design/icons';

import Button from './Common/Button';
import Sidebar from './Common/Sidebar';
// FIX : put related import statements together
import Input from './Common/Input';
import BreadCrumb from './Common/BreadCrumb';
import RadioBtn from './Common/RadioBtn';
import Pagination from './Common/Pagination';
import Dropdown from './Common/Dropdown';

const Login = () => (
  <div className="flex">
    <Sidebar />
    <div className="grid grid-rows-3 grid-flow-col gap-4 p-5">
      <Button onClick={() => console.log('button')} type="default">
        Button
      </Button>
      {/* <Button onClick={() => console.log('button')} type="gray">
        Button
      </Button>
      <Button onClick={() => console.log('button')} ghost>
        Button
      </Button>
      <Button onClick={() => console.log('button')} light>
        Button
      </Button>
      <Button onClick={() => console.log('button')} type="link">
        Button
      </Button>
      <Button onClick={() => console.log('button')} icon="CloseCircleOutlined">
        Button
      </Button>
      <Button onClick={() => console.log('button')} icon="FileExcelOutlined" iconPosition="right">
        Button
      </Button>
      <Input
        labelText="userName"
        inputName="username"
        placeholder="placeholder"
        suffix={<DeleteOutlined />}
        prefix={<IssuesCloseOutlined />}
        extrainfoLink="#"
        extrainfoText="generate password"
      />
      <Input
        placeholder=""
        labelText="userName"
        inputName="name"
        suffix={
          <Button
            onClick={() => console.log('button')}
            icon="SearchOutlined"
            shape="circle"
            type="gray"
          />
        }
      />
      <Input
        labelText="userName"
        inputName="username"
        placeholder="placeholder"
        suffix={<DeleteOutlined />}
        prefix={<IssuesCloseOutlined />}
        extrainfoLink="#"
        extrainfoText="generate password"
      /> */}

      <BreadCrumb />
      <RadioBtn>heloo world</RadioBtn>
      <Pagination pageNumber="1" totalNumberPages="22" />
      <Dropdown />
    </div>
  </div>
);

export default Login;
