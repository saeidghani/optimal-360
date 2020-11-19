import React from 'react';
import PropTypes from 'prop-types';

import { Spin } from 'antd';
import * as ICONS from '@ant-design/icons';

import { fetchFullURL } from '../../lib/utils';

const UploadAvatar = ({ type, className, setFile, text, file, icon, iconPosition, originalFile, wrapperClassName, title, pickedTitle, textSize, textClassName, children }) => {
  const [preview, setPreview] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const RICON = ICONS[icon];
  if (icon && typeof icon !== 'object' && typeof RICON === 'undefined' && !RICON) {
    console.warn(`icon name (${icon}) is not valid as an antd icon`);
  }

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

    // eslint-disable-next-line
  }, [imageSource]);

  return (
    <div className={`flex items-center ${wrapperClassName}`}>
      {loading && (
        <div className="z-20 w-full flex flex-row items-center bg-white">
          <Spin tip="Loading..." className="ml-3" />
        </div>
      )}

      <div className={`${loading && 'hidden'} flex flex-row items-center justify-center`}>
        {!imageSource && (
          <span className={`${title && 'mx-4'} text-black-500 text-lg`}>{title}</span>
        )}

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
              className={`flex justify-center items-center cursor-pointer ${type === 'primary' ?
                'border rounded border-primary-500 text-primary-500' :
                'border rounded-sm ant-btn ant-btn-gray'} ${className}`}
            >
              {iconPosition === 'left' ? (
                icon && typeof icon === 'object' ? (
                  icon
                ) : RICON ? (
                  <RICON className="inline-flex" />
                ) : null
              ) : null}

              {text ? (
                <p className={`font-normal text-${textSize} leading-6 ${textClassName}`}>{text}</p>
              ) : (
                children || null
              )}

              {iconPosition !== 'left' ? (
                icon && typeof icon === 'object' ? (
                  icon
                ) : RICON ? (
                  <RICON className="inline-flex" />
                ) : null
              ) : null}
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
            <div>{pickedTitle}</div>

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
  type: PropTypes.string,
  originalFile: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  text: PropTypes.string,
  textClassName: PropTypes.string,
  textSize: PropTypes.string,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  icon: PropTypes.string,
  iconPosition: PropTypes.string,
  wrapperClassName: PropTypes.string,
  title: PropTypes.string,
  pickedTitle: PropTypes.string,
  setFile: PropTypes.func.isRequired,
  children: PropTypes.node,
};

UploadAvatar.defaultProps = {
  type: 'primary', // also dashed is available
  file: '',
  className: '',
  text: 'Upload',
  textClassName: '',
  textSize: 'base',
  icon: '',
  iconPosition: 'left',
  originalFile: null,
  wrapperClassName: '',
  title: 'Client picture',
  pickedTitle: 'Client picture',
  children: '',
};

export default UploadAvatar;
