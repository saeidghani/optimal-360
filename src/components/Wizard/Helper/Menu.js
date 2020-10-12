import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { useQuery } from '../../../hooks/useQuery';

const _Menu = ({ items, title, className }) => {
  const [parsedQuery, , setQuery] = useQuery();

  const sortedArr = items?.sort((el1, el2) => el1.id - el2.id);
  // in order to keep menu items order consistent across renders

  React.useEffect(() => {
    const firstSurveyGroupId = sortedArr?.length > 0 ? sortedArr[0].id : '';

    const isURLSurveyGroupValid = !!sortedArr.find(
      (el) => el.id?.toString() === parsedQuery?.surveyGroupId?.toString(),
    );

    if (
      !isURLSurveyGroupValid &&
      firstSurveyGroupId &&
      firstSurveyGroupId !== parsedQuery?.surveyGroupId
    ) {
      setQuery({ surveyGroupId: firstSurveyGroupId });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Menu
      selectedKeys={[parsedQuery?.surveyGroupId]}
      mode="inline"
      className={`c-wizard-menu px-3 py-5 ${className}`}
    >
      <Menu.Item className="text-base text-body font-medium font-sans block">{title}</Menu.Item>

      {sortedArr.map(({ id, name }) => (
        <Menu.Item
          className="inline-flex items-center text-sm leading-5 capitalize text-antgray-100 my-2"
          onClick={({ key }) => setQuery({ surveyGroupId: key })}
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
  className: PropTypes.string,
};

_Menu.defaultProps = {
  items: [],
  title: 'Survey Group',
  className: '',
};

export default _Menu;
