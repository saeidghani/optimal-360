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

  const content = editorValue || template;

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
          height: 170,
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
