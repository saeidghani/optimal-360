import React from 'react';
import PropTypes, { number } from 'prop-types';
import { Menu } from 'antd';

const { SubMenu } = Menu;
const _Menu = (props) => {
  const {
    className,
    title,
    titleClassName,
    menuItems,
    onClickMenu,
    onClickCluter,
    onClickCompetency,
    onClickQuestion,
  } = props;

  return (
    <Menu
      onClick={onClickMenu}
      style={{ width: 202 }}
      className={`bg-antgray-600 ${className}`}
      defaultSelectedKeys={[]}
      defaultOpenKeys={[]}
      mode="inline"
    >
      {title && <h4 className={titleClassName}>{title}</h4>}

      {menuItems.map((cluter, index) => (
        <>
          <SubMenu
            key={`cluter_${cluter.key}`}
            title={
              <span id={index} onClick={onClickCluter}>
                {cluter.name}
              </span>
            }
          >
            {cluter.competencies.map((competency, competencyIndex) => (
              <SubMenu
                key={`cluter_${cluter.key}_competency_${competency.key}`}
                className="inner-sub-menu"
                title={
                  <span id={index + '' + competencyIndex} onClick={onClickCompetency}>
                    {competency.name}
                  </span>
                }
              >
                {competency.questions.map((question, questionIndex) => (
                  <Menu.Item
                    key={`cluter_${cluter.key}_competency_${competency.key}_question_${question.key}`}
                    onClick={(event) =>
                      onClickQuestion(event, index + '' + competencyIndex + '' + questionIndex)
                    }
                  >
                    - ${question.name}
                  </Menu.Item>
                ))}
              </SubMenu>
            ))}
          </SubMenu>
        </>
      ))}
    </Menu>
  );
};

_Menu.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  titleClassName: PropTypes.string,
};

_Menu.defaultProps = { className: '' };

export default _Menu;
