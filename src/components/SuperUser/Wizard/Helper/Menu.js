import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Menu } from 'antd';

import { dynamicMap } from '../../../../routes/RouteMap';

import { useQuery } from '../../../../hooks/useQuery';

import Button from '../../../Common/Button';

const _Menu = ({ items, title, className, onClick }) => {
  const history = useHistory();
  const [parsedQuery, , setQuery] = useQuery();
  const { projectId, surveyGroupId } = parsedQuery;

  const dispatch = useDispatch();

  // in order to keep menu items order consistent across renders
  const sortedArr = items?.sort((el1, el2) => el1.id - el2.id);

  const inactiveSurveyGroupIds = [];

  sortedArr.forEach((el) => {
    if (el.status === 'inactive') {
      inactiveSurveyGroupIds.push(el.id);
    }
  });

  const fetchInactiveSurveyGroupId = (selectedId) => {
    const isSelectedIdInactive = inactiveSurveyGroupIds.find((id) => id * 1 === selectedId * 1);

    // if selectedId is an inactive survey group id
    // but there isn't any other inactive survey group id present
    // we cannot remove the currently selectedId
    if (isSelectedIdInactive && inactiveSurveyGroupIds.length < 2) return '';

    const inactiveSurveyGroupId = inactiveSurveyGroupIds.find((id) => id * 1 !== selectedId * 1);

    // const firstSurveyGroupId = sortedArr.find((el) => el.id * 1 !== selectedId * 1);
    // if (!isSelectedIdInactive) return firstSurveyGroupId;

    return inactiveSurveyGroupId;
  };

  React.useEffect(() => {
    if (inactiveSurveyGroupIds.length < 1) {
      const path = dynamicMap.superUser.projectsList();

      history.replace(`${path}?status=active&page_size=10&page_number=1`);
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

      {sortedArr.map(({ id, name, status }) => (
        <Menu.Item
          disabled={status !== 'inactive'}
          className="flex flex-row justify-between items-center text-sm
          leading-5 capitalize text-antgray-100 my-2"
          onClick={({ key }) => {
            if (key * 1 !== surveyGroupId * 1) onClick(key);
          }}
          key={id}
        >
          <p>{name}</p>

          {inactiveSurveyGroupIds.length > 0 ? (
            <Button
              onClick={async (e) => {
                e.stopPropagation();
                e.preventDefault();

                const inactiveSurveyGroupId = fetchInactiveSurveyGroupId(id);

                await dispatch.projects.removeSurveyGroups({ projectId, surveyGroupIds: [id] });

                // if there is any alternative incative surveyGroupId (inactiveSurveyGroupId) we
                // can replace it with the currently selected inactive surveyGroupId
                if (inactiveSurveyGroupId) {
                  setQuery({ surveyGroupId: inactiveSurveyGroupId });
                }
              }}
              className="ml-auto text-lg text-antgray-100 text-opacity-50 px-0"
              iconClassName="mx-0 mr-0"
              icon="DeleteOutlined"
              type="link"
              textSize="xl"
            />
          ) : null}
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
