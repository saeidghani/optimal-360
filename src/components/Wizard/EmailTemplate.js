import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
// import { useHistory, useParams } from 'react-router-dom';
// import {useQuery} from '../../hooks/useQuery'

import MainLayout from '../Common/Layout';
import Button from '../Common/Button';

const EmailTemplate = ({ loading }) => {
  const { template } = useParams();
  // const history = useHistory();
  // const [query,parsedQuery,setQuery] = useQuery();

  const pageTitle = template.charAt(0).toUpperCase() + template.slice(1).replaceAll('-', ' ');

  return (
    <MainLayout hasBreadCrumb title="Super User" contentClass=" p-0">
      <div className="bg-white w-full flex font-sans ">
        <div className="w-full pt-12 px-6.5 ">
          <p className="text-body text-2xl">{pageTitle}</p>

          <div className="mt-2.5 flex flex-row justify-between items-center">
            <div className="flex">
              <Button
                text="Project Name"
                className="text-base px-3 h-8 flex items-center justify-center mr-3 rounded-2px"
              />
              <Button
                text="Rater"
                className="text-base w-16 h-8 flex items-center justify-center mr-3 rounded-2px"
              />
              <Button
                text="Sender"
                className="text-base w-19 h-8 flex items-center justify-center rounded-2px"
              />
            </div>
            <div className=" flex">
              <Button
                type="link"
                text="Cancel"
                className="text-base w-24.5 h-9.5 flex items-center justify-center"
              />
              <Button
                text="Save"
                className="text-base w-24.5 h-9.5 flex items-center justify-center rounded-2px"
              />
            </div>
          </div>
          <div className="h-94 w-full bg-template rounded-7px  mt-12">sd</div>
        </div>
      </div>
    </MainLayout>
  );
};

EmailTemplate.propTypes = {
  loading: PropTypes.bool.isRequired,
};

EmailTemplate.defaultProps = {};

export default EmailTemplate;
