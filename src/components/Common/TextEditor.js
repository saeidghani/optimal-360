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
  FormatPainterOutlined,
  FontColorsOutlined,
  HighlightOutlined,
} from '@ant-design/icons';

const TextEditor = ({
  placeholder,
  value: editorValue,
  onChange,
  disabled,
  options,
  template,
  data,
  wrapperClassName,
  className,
  label,
}) => {
  const editorRef = React.useRef();
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

  const content = editorValue || template;

  React.useMemo(() => {
    let tempVal = content;

    Object.entries(data || {}).forEach(([key, value]) => {
      const replaceWith =
        key === 'table'
          ? `
          <table>
            <tbody>
              <tr>
                ${value.header.map((txt) => `<td><div>${txt}</div></td>`)}
              </tr>
    
              ${value.body.map(
                (arr1) => `<tr>${arr1.map((arr2) => `<td><div>${arr2}</div></td>`)}</tr>`,
              )}
            </tbody>
          </table>
          `
          : value;

      tempVal = tempVal.replaceAll(`!${key.toUpperCase()}!`, replaceWith).replaceAll(',', '');
    });

    if (editorRef?.current?.editor) {
      editorRef.current.editor.onload(() => editorRef.current.editor.setContents(tempVal));
    }

    // eslint-disable-next-line
  }, [JSON.stringify(data), editorValue, template]);

  return (
    <div className={`c-text-editor ${wrapperClassName}`}>
      {label && <p className="font-normal text-body text-base leading-snug mb-3.5">{label}</p>}

      <SunEditor
        className={` ${className}`}
        ref={editorRef}
        enable={!disabled}
        onChange={onChange}
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
            font_color: renderToString(<FontColorsOutlined />),
            highlight_color: renderToString(<HighlightOutlined />),
            outdent: renderToString(<AlignRightOutlined />),
            indent: renderToString(<AlignLeftOutlined />),
            // blockquote: renderToString(<AlignLeftOutlined />),
            link: renderToString(<LinkOutlined />),
            image: renderToString(<FileImageOutlined />),
            table: renderToString(<TableOutlined />),
            paragraph_style: renderToString(<FormatPainterOutlined />),
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
          ...options,
        }}
      />
    </div>
  );
};

TextEditor.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  template: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.shape({}),
  data: PropTypes.shape({}),
  wrapperClassName: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
};

TextEditor.defaultProps = {
  placeholder: '',
  value: '',
  template: '',
  disabled: false,
  options: {},
  data: {},
  wrapperClassName: '',
  className: '',
  label: '',
};

export default TextEditor;
