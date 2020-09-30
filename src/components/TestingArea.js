// a place to test your components
import React from 'react';

// import Button from './Common/Button';
import Sidebar from './Common/Sidebar';
// FIX : put related import statements together
// import Input from './Common/Input';
// import BreadCrumb from './Common/BreadCrumb';
// import RadioBtn from './Common/RadioBtn';
// import Pagination from './Common/Pagination';
import Dropdown from './Common/Dropdown';
// import Steps from './Common/Steps';
// import Tabs from './Common/Tabs';
// import Progress from './Common/Progress';
// import Menu from './Common/Menu';
// import Modal from './Common/Modal';
// import TreeSelect from './Common/TreeSelect';
import DatePicker from './Common/DatePicker';
import AutoComplete from './Common/AutoComplete';
import Select from './Common/Select';

const Login = () => {
  // const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex">
      <Sidebar />
      <div className="grid grid-rows-3 grid-flow-col gap-1 p-5">
        {/* <Button onClick={() => console.log('button')} type="default">
          Button
        </Button>
        <Button onClick={() => console.log('button')} type="gray">
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
        />

        <BreadCrumb />
        <RadioBtn>heloo world</RadioBtn>
        <Pagination pageNumber="1" totalNumberPages="22" />
        <Steps currentPosition={2} />
        <Tabs />
        <Progress type="line" percentage={49} />
        <Progress type="line" percentage={0} />
        <Progress percentage={51} />
        <Progress percentage={50} />
        <Progress percentage={100} />
        <Progress status="sub" percentage={100} />
        <Menu />
        <Button type="primary" onClick={() => setIsVisible(!isVisible)}>
          Open Modal
        </Button>
        <Modal visible={isVisible} handleCancel={() => setIsVisible(!isVisible)} /> */}
        <AutoComplete />
        <Dropdown />

        <DatePicker />
        <Select elements={['Top Leadership', 'Managers', 'High Potentials']} />
      </div>
      {/* <div style={{ width: '500px' }}>
        <TreeSelect />
      </div> */}
    </div>
  );
};

export default Login;
