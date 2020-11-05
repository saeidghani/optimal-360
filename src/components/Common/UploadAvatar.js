import React from 'react';
import PropTypes from 'prop-types';

import { Spin } from 'antd';

import { fetchFullURL } from '../../lib/utils';

const UploadAvatar = ({ setFile, file, originalFile, wrapperClassName }) => {
  const [preview, setPreview] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleChange = (info) => {
    const pickedFile = info?.target?.files[0];

    if (pickedFile) {
      setLoading(true);
      const reader = new FileReader();

      reader.onload = (res) => {
        setLoading(false);

        setPreview(res.target.result);
        setFile(pickedFile);
      };

      reader.readAsDataURL(pickedFile); // convert to base64 string
    }
  };

  const imageSource = preview || fetchFullURL(file);

  React.useEffect(() => {
    if (imageSource && !loading) {
      setLoading(true);
    }
  }, [imageSource]);

  return (
    <div className={`flex items-center ${wrapperClassName}`}>
      {loading && (
        <div className="z-20 w-full flex flex-row items-center bg-white">
          <Spin tip="Loading..." className="ml-3" />
        </div>
      )}

      <div className={`${loading && 'hidden'} flex flex-row items-center justify-center`}>
        {!imageSource && <span className="mx-4 text-black-500 text-lg">Client picture</span>}

        <label htmlFor="Client-picture">
          {imageSource ? (
            <img
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
              className="rounded-full border h-20 w-20"
              src={imageSource}
              alt="uploaded file"
            />
          ) : (
            <div
              className="w-24.5 h-9.5 flex justify-center items-center
          cursor-pointer border rounded border-primary-500 text-primary-500"
            >
              <p className="text-base">Upload</p>
            </div>
          )}

          <input
            accept="image/*"
            type="file"
            className="hidden"
            id="Client-picture"
            name="Client-picture"
            onChange={handleChange}
          />
        </label>

        {imageSource && (
          <div className="ml-4 ">
            <div> Client picture </div>

            <div
              className="text-red-500 text-xs cursor-pointer "
              onClick={() => {
                if (originalFile && preview) {
                  setFile(originalFile);
                  setPreview('');
                } else {
                  setFile('');
                  setPreview('');
                }
              }}
            >
              Delete
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

UploadAvatar.propTypes = {
  originalFile: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  wrapperClassName: PropTypes.string,
  setFile: PropTypes.func.isRequired,
};

UploadAvatar.defaultProps = {
  file: '',
  originalFile: null,
  wrapperClassName: '',
};

export default UploadAvatar;
