import React from 'react';
import TinyMCE from 'react-tinymce';
 
class DocumentEditor extends React.Component {
	handleEditorChange(e) {
    console.log(e.target.getContent({format: raw}));
  }
 
  render() {
    return (
      <TinyMCE
        content="<p>This is the initial content of the editor</p>"
        config={{
          plugins: 'link image preview',
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
        }}
        onChange={(e) => this.handleEditorChange(e)}
      />
    );
  }
};
 
export default DocumentEditor;
