import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { useHistory, useParams } from 'react-router-dom';

const _Menu = ({ items, title }) => {
  const history = useHistory();
  const { pathname } = history?.location;

  const { projectId, surveyGroupId } = useParams();

  if (!surveyGroupId) {
    const firstSurveyGroupId = items?.length > 0 ? items[0].id : '';
    history.push(`${pathname}/${firstSurveyGroupId}`);
  }

  const oldParams = `${projectId}/${surveyGroupId}`;
  const newPathname = pathname.split(oldParams)[0] + projectId;

  return (
    <Menu
      selectedKeys={[surveyGroupId]}
      mode="inline"
      style={{ width: 226, paddingLeft: 11, paddingTop: 30 }}
    >
      <h4 className="pb-6 pl-4 text-body font-medium font-sans">{title}</h4>

      {items.map(({ id, name }) => (
        <Menu.Item onClick={({ key }) => history.push(`${newPathname}/${key}`)} key={id}>
          {name}
        </Menu.Item>
      ))}
    </Menu>
  );
};

_Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

_Menu.defaultProps = {
  items: [],
  title: 'Survey Group',
};

export default _Menu;
