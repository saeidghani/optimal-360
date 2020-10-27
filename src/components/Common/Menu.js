import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';

import { useQuery } from '../../hooks/useQuery';

const { SubMenu } = Menu;

const _Menu = ({
  className,
  title,
  titleClassName,
  items,
  onMenuClick,
  onClusterClick,
  onCompetencyClick,
  onQuestionClick,
}) => {
  const [parsedQuery] = useQuery();
  const { clusterId, competencyId, questionId } = parsedQuery;

  const selectedKeys = [
    `cluster_${clusterId}`,
    `cluster_${clusterId}_competency_${competencyId}`,
    `cluster_${clusterId}_competency_${competencyId}_question_${questionId}`,
  ];

  return (
    <Menu
      level={3}
      selectedKeys={selectedKeys}
      openKeys={selectedKeys}
      onClick={onMenuClick}
      className={`bg-antgray-600 ${className}`}
      // defaultSelectedKeys={[]}
      // defaultOpenKeys={[]}
      mode="inline"
    >
      {title && <Menu.Item className={titleClassName}>{title}</Menu.Item>}

      {items.map((cluster) => (
        <SubMenu
          key={`cluster_${cluster.id}`}
          onTitleClick={() => onClusterClick(cluster.id)}
          title={cluster.name}
        >
          {cluster.competencies.map((competency) => (
            <SubMenu
              key={`cluster_${cluster.id}_competency_${competency.id}`}
              className="inner-sub-menu"
              onTitleClick={() => onCompetencyClick(competency.id)}
              title={competency.name}
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
  items: PropTypes.arrayOf(PropTypes.shape({})),
  onMenuClick: PropTypes.func,
  onClusterClick: PropTypes.func,
  onCompetencyClick: PropTypes.func,
  onQuestionClick: PropTypes.func,
};

_Menu.defaultProps = { items: [], className: '' };

export default _Menu;
