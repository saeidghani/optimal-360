import React, { useState } from 'react';
import MainLayout from '../Common/Layout';
import Menu from './Helper/Menu';
import Steps from '../Common/Steps';
import Button from '../Common/Button';
import UploadAvatar from '../Common/UploadAvatar';

const SurveyIntro = () => {

  const [imageFile, setImageFile] = useState('');

  const getImageFile = (file) => {
    setImageFile(file);
  }

  return (
    <MainLayout
      hasBreadCrumb
      title="Super User"
      titleClass="mb-2"
      contentClass="py-4"
      headerClassName="pl-21"
      childrenPadding={false}
    >
      <div className="bg-white grid grid-cols-12 pl-15">
        <Menu className="col-span-2" />
        <div className="px-6 py-5 col-start-3 col-span-10  ">
          <Steps currentPosition={2} />
          <div className="mt-13 flex flex-row items-center">
            {/* <span className=" ml-8 mr-3 text-body  text-base">Client picture</span> */}
            <UploadAvatar selectedFile={getImageFile} image="" />
          </div>
          <div className=" mt-18 pr-28">
            <span className="text-body text-base">Client Welcome Message</span>
            <div className="mt-3.5 bg-template rounded-7px w-full h-53 mb-18">sd</div>
            <span className="text-body text-base ">Survey Message</span>
            <div className="mt-3.5 bg-template rounded-7px w-full h-53">sd</div>
            <div className="pt-10 pb-22  flex justify-end">
              <Button type="link" text="Back" />
              <Button text="Next" />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SurveyIntro;
