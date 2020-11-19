/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';

import { useQuery } from '../../hooks/useQuery';

const { SubMenu } = Menu;

const _Menu = ({
  className,
  defaultClusterId,
  title,
  titleClassName,
  items,
  // onMenuClick,
  onClusterClick,
  onCompetencyClick,
  onQuestionClick,
}) => {
  const menuRef = React.useRef();
  const [parsedQuery] = useQuery();
  const { clusterId, competencyId, questionId } = parsedQuery;

  const activeKeys = [];

  if (clusterId) {
    activeKeys.push(`cluster_${clusterId}`);

    if (competencyId) {
      activeKeys.push(`cluster_${clusterId}_competency_${competencyId}`);

      if (questionId) {
        activeKeys.push(`cluster_${clusterId}_competency_${competencyId}_question_${questionId}`);
      }
    }
  }

  // last resort
  const competencyMenuId = `cluster_${clusterId}$Menu`;
  const competencyMenu = document.getElementById(competencyMenuId);
  if (competencyMenu) competencyMenu.style.height = 'auto';

  const questionMenuId = `cluster_${clusterId}_competency_${competencyId}$Menu`;
  const questionMenu = document.getElementById(questionMenuId);
  if (questionMenu) questionMenu.style.height = 'auto';

  return (
    <Menu
      defaultActiveFirst
      selectedKeys={activeKeys}
      openKeys={activeKeys}
      className={`c-secondary-menu bg-antgray-600 ${className}`}
      mode="inline"
      triggerSubMenuAction="click"
    >
      {title && <Menu.Item className={`c-secondary-menu ${titleClassName}`}>{title}</Menu.Item>}

      {items?.length > 0
        ? items.map((cluster) => (
            <SubMenu
              ref={menuRef}
              className={`c-secondary-menu pl-6 ${
                cluster.id * 1 === clusterId * 1 ? 'cluster-selected' : ''
              }`}
              key={`cluster_${cluster.id}`}
              onTitleClick={() => onClusterClick(cluster.id)}
              title={cluster.name}
            >
              {cluster?.competencies?.length > 0
                ? cluster.competencies.map((competency) => (
                    <SubMenu
                      key={`cluster_${cluster.id}_competency_${competency.id}`}
                      className={`c-secondary-menu inner-sub-menu ${
                        competency.id * 1 === competencyId * 1
                          ? 'competency-selected'
                          : 'competency'
                      }`}
                      onTitleClick={() => onCompetencyClick(competency.id)}
                      title={competency.name}
                    >
                      {competency?.questions?.length > 0
                        ? competency.questions.map((question) => (
                            <Menu.Item
                              className={`c-secondary-menu ${
                                competency.id * 1 === competencyId * 1
                                  ? 'competency-selected'
                                  : 'competency'
                              }`}
                              key={`cluster_${cluster.id}_competency_${competency.id}_question_${question.id}`}
                              onClick={() => onQuestionClick(question.id)}
                            >
                              {question.label}
                            </Menu.Item>
                          ))
                        : null}
                    </SubMenu>
                  ))
                : null}
            </SubMenu>
          ))
        : null}
    </Menu>
  );
};

_Menu.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  defaultClusterId: PropTypes.number,
  titleClassName: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  // onMenuClick: PropTypes.func.isRequired,
  onClusterClick: PropTypes.func.isRequired,
  onCompetencyClick: PropTypes.func.isRequired,
  onQuestionClick: PropTypes.func.isRequired,
};

_Menu.defaultProps = {
  items: [],
  className: '',
  titleClassName: '',
  defaultClusterId: 0,
  title: '',
};

export default _Menu;
