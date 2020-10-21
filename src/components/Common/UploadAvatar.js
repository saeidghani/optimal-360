import React, { useEffect, useState } from 'react';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const UploadAvatar = ({ onFileUpload, file, wrapperClassName }) => {
  const [imageFile, setImageFile] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setImageUrl(file);
  });

  const handleChange = (info) => {
    const pickedFile = info?.target?.files[0];

    if (pickedFile) {
      setLoading(true);
      const reader = new FileReader();

      reader.onload = (res) => {
        setLoading(false);

        setImageFile(res.target.result);
        onFileUpload(res.target.result);
      };

      reader.readAsDataURL(pickedFile); // convert to base64 string
    }
  };

  const profile = (
    <div className="w-20 relative cursor-pointer">
      {imageFile && (
        <img className="rounded-full w-full border h-20 w-20" src={imageFile} alt="avatar" />
      )}

      {file && !imageFile && (
        <img
          className="rounded-full w-full border h-20 w-20"
          src={imageUrl}
          alt="uploaded avatar"
        />
      )}

      {loading ? (
        <LoadingOutlined className="absolute left-0 top-0 text-white bg-gray-400 rounded-full m-2" />
      ) : (
        <PlusOutlined className="absolute left-0 top-0 text-white bg-gray-400 rounded-full m-2" />
      )}
    </div>
  );

  const deleteImage = () => {
    setImageFile();
    setImageUrl('');
  };

  const uploadbtn = (
    <div className="flex justify-start items-center">
      <span className="px-5 py-3 cursor-pointer border rounded border-blue-400 text-blue-400">
        Upload
      </span>
    </div>
  );

  return (
    <div className={`flex items-center ${wrapperClassName}`}>
      {!imageFile && !imageUrl && (
        <span className="mx-4 text-black-500 text-lg">Client picture</span>
      )}

      <label htmlFor="Client-picture">
        {imageFile || imageUrl ? profile : uploadbtn}

        <input
          accept="image/*"
          type="file"
          className="hidden"
          id="Client-picture"
          name="Client-picture"
          onChange={handleChange}
        />
      </label>

      {(imageFile || imageUrl) && (
        <div className="ml-4 ">
          <div> Client picture </div>
          <div className="text-red-500 text-xs cursor-pointer " onClick={deleteImage}>
            Delete
          </div>
        </div>
      )}
    </div>
  );
};

UploadAvatar.propTypes = {
  file: PropTypes.string,
  wrapperClassName: PropTypes.string,
  onFileUpload: PropTypes.func.isRequired,
};

UploadAvatar.defaultProps = {
  file: '',
  wrapperClassName: '',
};

export default UploadAvatar;
