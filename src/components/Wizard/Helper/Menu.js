import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { useQuery } from '../../../hooks/useQuery';

const _Menu = ({ items, title }) => {
  const [parsedQuery, , setQuery] = useQuery();

  React.useEffect(() => {
    const surveyGroupId = items?.length > 0 ? items[0].id : '';

    if (surveyGroupId || surveyGroupId !== parsedQuery?.surveyGroupId) {
      setQuery({ surveyGroupId }, { pagination: false });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Menu
      selectedKeys={[parsedQuery?.surveyGroupId]}
      mode="inline"
      style={{ width: 226, paddingLeft: 11, paddingTop: 30 }}
    >
      <h4 className="pb-6 pl-4 text-body font-medium font-sans">{title}</h4>

      {items.map(({ id, name }) => (
        <Menu.Item
          onClick={({ key }) => setQuery({ surveyGroupId: key }, { pagination: false })}
          key={id}
        >
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
