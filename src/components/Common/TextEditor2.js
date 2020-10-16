import React from 'react';
import {
  RedoOutlined,
  UndoOutlined,
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { Editor, EditorState } from 'react-draft-wysiwyg';

const toolbar = {
  options: [
    'history',
    'fontSize',
    'fontFamily',
    'blockType',
    'inline',
    'list',
    'textAlign',
    'link',
    'image',
    'embedded',
    'emoji',
    // 'remove',
  ],
  history: {
    className: 'c-text-editor-section',
    options: ['undo', 'redo'],
    undo: { component: <RedoOutlined />, className: undefined },
    redo: { component: <UndoOutlined />, className: undefined },
  },
  fontSize: {
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
    className: 'c-text-editor-section',
  },
  fontFamily: {
    options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
    className: 'c-text-editor-section',
  },
  inline: {
    className: 'c-text-editor-section',
    options: ['bold', 'italic', 'strikethrough'],
    bold: { component: <BoldOutlined /> },
    italic: { component: <ItalicOutlined /> },
    strikethrough: { component: <StrikethroughOutlined /> },
  },
  blockType: {
    inDropdown: true,
    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
    className: 'c-text-editor-section',
  },
  list: {
    className: 'c-text-editor-section',
    options: ['ordered', 'unordered'],
    ordered: { component: <OrderedListOutlined /> },
    unordered: { component: <UnorderedListOutlined /> },
  },
  textAlign: {
    className: 'c-text-editor-section',
    options: ['left', 'center', 'right'],
    left: { component: <AlignLeftOutlined /> },
    center: { component: <AlignCenterOutlined /> },
    right: { component: <AlignRightOutlined /> },
  },
  link: {
    className: 'c-text-editor-section',
    showOpenOptionOnHover: true,
    defaultTargetOption: '_self',
    options: ['link', 'unlink'],
    link: { component: <LinkOutlined /> },
  },
  image: {
    className: 'c-text-editor-section',
    popupClassName: undefined,
    urlEnabled: false,
    uploadEnabled: true,
    alignmentEnabled: true,
    uploadCallback: true,
    previewImage: true,
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
  },
  emoji: {
    // icon: emoji,
    className: undefined,
    popupClassName: undefined,
    emojis: ['😀', '😁', '😂'],
  },
  embedded: {
    // icon: embedded,
    className: undefined,
    popupClassName: undefined,
    embedCallback: undefined,
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
  },
  // remove: { icon: eraser, className: undefined, component: undefined },
};

const TextEditor = (props) => {
  const [editorState, setEditorState] = React.useState(() => EditorState?.createEmpty());

  return (
    <div
      style={{
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10,
      }}
    >
      <Editor
        // toolbarHidden
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={toolbar}
      />
    </div>
  );
};

export default TextEditor;
