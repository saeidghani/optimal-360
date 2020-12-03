import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Menu } from 'antd';

import { dynamicMap } from '../../../../routes/RouteMap';

import { useQuery, stringify } from '../../../../hooks/useQuery';

import Button from '../../../Common/Button';

const _Menu = ({ items, title, className, onClick }) => {
  const history = useHistory();
  const [parsedQuery, , setQuery] = useQuery();
  const { projectId, surveyGroupId } = parsedQuery;

  const dispatch = useDispatch();

  // in order to keep menu items order consistent across renders
  const sortedArr = items?.sort((el1, el2) => el1.id - el2.id);

  const isSurveyGroupEditable = (el) => !el.stepsStatus || !moment(el.startDate).isBefore();

  const fetchValidSurveyGroupId = (selectedId) => {
    if (selectedId * 1 !== parsedQuery?.surveyGroupId * 1) return parsedQuery?.surveyGroupId;

    const nextValidSurveyGroupId = sortedArr.find((el) => el.id * 1 !== selectedId * 1)?.id;
    return nextValidSurveyGroupId;
  };

  const removeSurveyGroups = async (selectedId) => {
    const validSurveyGroupId = fetchValidSurveyGroupId(selectedId);

    await dispatch.projects.removeSurveyGroups({ projectId, surveyGroupIds: [selectedId] });

    // if there is any alternative incative surveyGroupId (validSurveyGroupId) we
    // can replace it with the currently selected inactive surveyGroupId
    if (validSurveyGroupId) {
      setQuery({ surveyGroupId: validSurveyGroupId });
    }
  };

  React.useEffect(() => {
    if (sortedArr.length === 0) {
      const path = dynamicMap.superUser.projectsList();

      history.replace(`${path}?status=active&page_size=10&page_number=1`);
    } else {
      const editableSurveyGroup = sortedArr.find(isSurveyGroupEditable);

      if (!editableSurveyGroup) {
        const path = dynamicMap.superUser.ratersList();
        const params = stringify({
          projectId,
          surveyGroupId,
        });

        history.replace(`${path}${params}`);
      }
    }

    // eslint-disable-next-line
  }, [JSON.stringify({ sortedArr })]);

  return (
    <Menu
      selectedKeys={[surveyGroupId]}
      mode="inline"
      className={`c-wizard-menu px-3 py-5 ${className}`}
    >
      <Menu.Item className="text-base text-body font-medium font-sans block">{title}</Menu.Item>

      {sortedArr.map((el) => (
        <Menu.Item
          disabled={!isSurveyGroupEditable(el)}
          className="flex flex-row justify-between items-center text-sm
          leading-5 capitalize text-antgray-100 my-2"
          onClick={({ key }) => {
            if (key * 1 !== surveyGroupId * 1) onClick(key);
          }}
          key={el.id}
        >
          <p>{el.name}</p>

          <Button
            onClick={async (e) => {
              e.stopPropagation();
              e.preventDefault();

              removeSurveyGroups(el.id);
            }}
            className="ml-auto text-lg text-antgray-100 text-opacity-50 px-0"
            iconClassName="mx-0 mr-0"
            icon="DeleteOutlined"
            type="link"
            textSize="xl"
          />
        </Menu.Item>
      ))}
    </Menu>
  );
};

_Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

_Menu.defaultProps = {
  items: [],
  title: 'Survey Group',
  className: '',
};

export default _Menu;
