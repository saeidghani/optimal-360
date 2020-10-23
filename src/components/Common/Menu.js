import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';

const { SubMenu } = Menu;

const _Menu = (props) => {
  const {
    className,
    title,
    titleClassName,
    items,
    onMenuClick,
    onClusterClick,
    onCompetencyClick,
    onQuestionClick,
  } = props;

  return (
    <Menu
      onClick={onMenuClick}
      className={`bg-antgray-600 ${className}`}
      defaultSelectedKeys={[]}
      defaultOpenKeys={[]}
      mode="inline"
    >
      {title && <Menu.Item className={titleClassName}>{title}</Menu.Item>}

      {items.map((cluster, index1) => (
        <SubMenu
          key={`cluster_${cluster.id}`}
          title={
            <span id={index1} onClick={onClusterClick}>
              {cluster.name}
            </span>
          }
        >
          {cluster.competencies.map((competency, index2) => (
            <SubMenu
              key={`cluster_${cluster.id}_competency_${competency.id}`}
              className="inner-sub-menu"
              title={
                <span id={`${index1}${index2}`} onClick={onCompetencyClick}>
                  {competency.name}
                </span>
              }
            >
              {competency.questions.map((question) => (
                <Menu.Item
                  key={`cluster_${cluster.id}_competency_${competency.id}_question_${question.id}`}
                  onClick={() => onQuestionClick(question.id)}
                >
                  {question.label}
                </Menu.Item>
              ))}
            </SubMenu>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );
};

_Menu.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  titleClassName: PropTypes.string,
  items: PropTypes.array,
  onMenuClick: PropTypes.func,
  onClusterClick: PropTypes.func,
  onCompetencyClick: PropTypes.func,
  onQuestionClick: PropTypes.func,
};

_Menu.defaultProps = { className: '' };

export default _Menu;
