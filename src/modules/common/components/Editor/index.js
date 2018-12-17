
import React from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import $ from 'jquery';
import { RESOURCES_PATH, BASE_URL } from '../../constants';
import './Editor.css';

window.$ = $;
const UPLOAD_URL = BASE_URL + 'api/content/create-upload';
const SHORT_TOOLBAR = ['bold', 'italic', 'underline', '|', 'fontFamily', 'fontSize', 'color', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'quote', 'emoticons', 'specialCharacters', '|', 'undo', 'redo'];
const FULL_TOOLBAR = ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '|', 'insertLink', 'insertImage', 'insertVideo', 'insertTable', '|', 'quote', 'insertHR', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'];
const Editor = (props) =>
  (<FroalaEditor tag='textarea'
    {...props}
    config={{
      placeholderText: 'Edit Your Content Here!',
      toolbarButtons: props.fullToolbar ? FULL_TOOLBAR : SHORT_TOOLBAR,
      charCounterCount: false,
      imageUploadURL: UPLOAD_URL,
      imageUploadParams: {},
      imageUploadMethod: 'POST',
      events: {
        'froalaEditor.image.uploaded': (e, editor, response) => {
          response = JSON.parse(response);
          editor.image.insert(RESOURCES_PATH + response.value.name, true, null, editor.image.get(), null);
          if (props.onUploadedImage) {
            props.onUploadedImage(response.value.name);
          }
          return false
        }
      }
    }} />)

export default Editor;

