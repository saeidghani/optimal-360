import React from 'react';
import PropTypes, { number } from 'prop-types';
import { Menu } from 'antd';

const { SubMenu } = Menu;
const _Menu = ({ className, title, titleClassName, menuItems }) => {
  const handleClick = (e) => {
  };




  const CluterClick = (e) => {
    alert('cluter click')
  };

  const CompetencyClick = (e) => {
    alert('Competency click')
  };

  const QuestionClick = (e) => {
    alert('Question click')
  };



  return (
    <Menu
      onClick={handleClick}
      style={{ width: 202 }}
      className={`bg-antgray-600 ${className}`}
      defaultSelectedKeys={[]}
      defaultOpenKeys={[]}
      mode="inline"
    >
      {title && <h4 className={titleClassName}>{title}</h4>}

      {menuItems.map((cluter) =>
        <>
          <SubMenu key={`cluter_${cluter.key}`} title={<span onClick={CluterClick} >{cluter.name}</span>} >
            {cluter.competencies.map((competency) =>
              <SubMenu key={`cluter_${cluter.key}_competency_${competency.key}`} className="inner-sub-menu" title={<span onClick={CompetencyClick} >{competency.name}</span>}>
                {competency.questions.map((question) =>
                  <Menu.Item key={`cluter_${cluter.key}_competency_${competency.key}_question_${question.key}`} onClick={QuestionClick}  >- ${ question.name }</Menu.Item>
                )}
              </SubMenu>
            )}
          </SubMenu>
        </>
      )}

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
