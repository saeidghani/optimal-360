/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { renderToString } from 'react-dom/server';
import SunEditor from 'suneditor-react';

import {
  UndoOutlined,
  RedoOutlined,
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  // UnorderedListOutlined,
  // OrderedListOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  LinkOutlined,
  FileImageOutlined,
  TableOutlined,
  FullscreenOutlined,
} from '@ant-design/icons';

const TextEditor = ({ placeholder }) => {
  // React.useLayoutEffect(() => {
  //   // replacing toolbar icons in the most idiotic way possible
  //   const data = [
  //     { newElement: '<span>Styles</span>', selector: '[data-command="textStyle"]' },
  //     // { newElement: '<span>Format</span>', selector: '[data-command="formatBlock"]' },
  //     // { newElement: renderToString(<OrderedListOutlined />), selector: '[data-command="OL"]' },
  //     // { newElement: renderToString(<UnorderedListOutlined />), selector: '[data-command="UL"]' },
  //   ];

  //   data.forEach(({ selector, newElement }) => {
  //     const el = document.querySelector(selector);
  //     el.classList.add('se-btn-select');
  //     // const children = el.childNodes;
  //     // children[0].remove();
  //     // el.insertAdjacentHTML('afterbegin', newElement);
  //   });
  // }, []);

  const content = `
    <p> $PROJECT_NAME : Please verify your rater ​</p>
    <p> To : $RATER &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; From : $SENDER ​</p> 
    <br /> <hr class="__se__solid" />  <br />
    <p> Dear $RATER ​, </p>  
    <p> You have been nominated to provide leadership competency feedback on the following individual(s): ​, </p>  
  `;

  return (
    <div className="c-text-editor p-5">
      <SunEditor
        onChange={(val) => console.log(val)}
        setContents={content}
        placeholder={placeholder}
        resizingBar={false}
        setOptions={{
          height: 300,
          icons: {
            undo: renderToString(<UndoOutlined />),
            redo: renderToString(<RedoOutlined />),
            // text_style: '<span class="txt" data-value="p" data-class="">Styles</span>',
            bold: renderToString(<BoldOutlined />),
            italic: renderToString(<ItalicOutlined />),
            strike: renderToString(<StrikethroughOutlined />),
            list: renderToString(<StrikethroughOutlined />),
            outdent: renderToString(<AlignRightOutlined />),
            indent: renderToString(<AlignLeftOutlined />),
            // blockquote: renderToString(<AlignLeftOutlined />),
            link: renderToString(<LinkOutlined />),
            image: renderToString(<FileImageOutlined />),
            table: renderToString(<TableOutlined />),
            fullScreen: renderToString(<FullscreenOutlined />),
          },
          buttonList: [
            ['undo', 'redo'],
            ['textStyle'],
            ['formatBlock'],
            ['bold', 'italic', 'strike'],
            ['fontColor', 'hiliteColor'],
            ['list'],
            ['outdent', 'indent'],
            ['blockquote'],
            ['link'],
            ['image', 'table', 'paragraphStyle', 'horizontalRule', 'removeFormat'],
            ['fullScreen'],
          ],
        }}
      />
    </div>
  );
};

TextEditor.propTypes = {
  placeholder: PropTypes.string,
};

TextEditor.defaultProps = {
  placeholder: '',
};

export default TextEditor;
