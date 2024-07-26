import 'react-mde/lib/styles/css/react-mde-all.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactMde from 'react-mde';
import Showdown from 'showdown';
import './editor.css';

export default function Editor({ tempNoteText, setTempNoteText }) {
  const [selectedTab, setSelectedTab] = useState('write');

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  return (
    <section className="pane editor">
      <ReactMde
        value={tempNoteText}
        onChange={setTempNoteText}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={80}
        heightUnits="vh"
      />
    </section>
  );
}

Editor.propTypes = {
  setTempNoteText: PropTypes.func.isRequired,
  tempNoteText: PropTypes.string.isRequired,
};
