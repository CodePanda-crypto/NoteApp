import 'react-markdown/lib/styles/css/react-markdown-all.css'; // Adjust if needed
import './editor.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef } from 'react';

export default function Editor({ currentNote, updateNote }) {
  const [editorContent, setEditorContent] = useState(currentNote.body);
  const editorRef = useRef(null);

  // Update editorContent when currentNote.body changes
  useEffect(() => {
    setEditorContent(currentNote.body);
  }, [currentNote.body]);

  // Handle change in editor content
  const handleChange = (event) => {
    setEditorContent(event.target.value);
    updateNote({
      ...currentNote,
      body: event.target.value,
    });
  };

  return (
    <section className="pane editor">
      <textarea
        ref={editorRef}
        value={editorContent}
        onChange={handleChange}
        style={{ height: '80vh', width: '100%' }}
      />
      <div className="preview">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {editorContent}
        </ReactMarkdown>
      </div>
    </section>
  );
}

Editor.propTypes = {
  currentNote: PropTypes.shape({
    body: PropTypes.string,
  }).isRequired,
  updateNote: PropTypes.func.isRequired,
};
