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

  // const content = `
  //    <p> $PROJECT_NAME : Please verify your rater </p>
  //    <br />
  //    <p> To : $RATER &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; From : $SENDER ​</p>
  //    <br /> <hr class="__se__solid" />  <br />
  //    <p> Dear $RATER , </p>
  //    <br />
  //    <p> You have been nominated to provide leadership competency feedback on the following individual(s): </p>

  //    <br />
  //    <br />

  //    <table>
  //      <tbody>
  //        <tr>
  //          <td><div>Name</div></td><td>
  //          <div>Relationship</div></td>
  //          <td><div>Start Date</div></td>
  //          <td><div>End Date</div></td>
  //        </tr>
  //        <tr>
  //          <td><div>X</div></td><td>
  //          <div>Y</div></td>
  //          <td><div>1</div></td>
  //          <td><div>2</div></td>
  //        </tr>
  //        <tr>
  //          <td><div>X</div></td>
  //          <td><div>Y</div></td>
  //          <td><div>3</div></td>
  //          <td><div>4</div></td>
  //        </tr>
  //      </tbody>
  //    </table>
  //    <br />
  //    <br />
  //
  //    <p> Please verify the name of the individual(s) who has/have nominated you as a rater and the respective work relationship(s).
  //    Should there be any problems with the information, please notify your in-house HR team immediately. </p>
  //     <br />
  //    <p> You will receive another email with the Login information shortly before the project starts. </p>
  //    <br />
  //    <p> Thank you, </p>
  //    <br />
  //    $SENDER
  //  `;
  // const content = `
  //   <p> $PROJECT_NAME : Please verify your rater </p>
  //   <br />
  //   <p> To : $RATER &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; From : $SENDER </p>
  //   <br /> <hr class="__se__solid" />  <br />

  //   <p> Dear $RATER , </p>
  //   <br />
  //   <p> Please complete and submit the survey by $END_DATE. </p>
  //   <br />
  //   <p> To access the survey, we recommend that you upgrade to the most recent version of your browser. </p>
  //   <br />
  //   <p> Please click on the following link to proceed: $SURVEY_LINK </p>
  //   <br />
  // <p> Your Login ID is : $RATER_LOGIN_ID </p>
  // <p> Your Password is : $PASSWORD </p>
  //   <br />
  //   <p> Thank you, </p>
  //   <br />
  //   $SENDER
  // `;
  const content = `
    <p> $PROJECT_NAME : Please verify your rater </p>
    <br />
    <p> To : $RATER &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; From : $SENDER ​</p>
    <br /> <hr class="__se__solid" />  <br />
    <p> Dear $RATER , </p>
    <br />
    <p> You have been nominated to provide leadership competency feedback on the following individual(s): </p>

    <br />
    <br />

    <table>
      <tbody>
        <tr>
          <td><div>Name</div></td><td>
          <div>Relationship</div></td>
          <td><div>Start Date</div></td>
          <td><div>End Date</div></td>
        </tr>
        <tr>
          <td><div>X</div></td><td>
          <div>Y</div></td>
          <td><div>1</div></td>
          <td><div>2</div></td>
        </tr>
        <tr>
          <td><div>X</div></td>
          <td><div>Y</div></td>
          <td><div>3</div></td>
          <td><div>4</div></td>
        </tr>
      </tbody>
    </table>
    <br />
    <br />

    <p>Please complete and submit the survey(s) by $END_DATE.
    Your feedback will be kept confidential and will be reported under a set of consolidated data.</p>
    <br />
    <p> To access the survey, we recommend that you upgrade to the most recent version of your browser. </p>
    <br />
    <p> Please click on the following link to proceed: $SURVEY_LINK </p>
    <br />    
    <p> Your Login ID is : $RATER_LOGIN_ID </p>
    <p> Your Password is : $PASSWORD </p>
    <br />    
    <p> Thank you, </p>
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
