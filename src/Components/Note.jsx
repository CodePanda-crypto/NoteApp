import './Note.css';
import magicWandIcon from '/images/magic-wand.png';
import PropTypes from 'prop-types';

export default function Meme(props) {
  return (
    <main className="main-container">
      <div className="user-input-container">
        <div className="input-container">
          <div className="input-wrapper">
            <label htmlFor="topText">Top Text</label>
            <br />
            <input
              type="text"
              id="topText"
              name="topText"
              placeholder="Enter your text"
              value={props.meme.topText}
              onChange={props.handleInputChange}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="bottomText">Bottom Text</label>
            <br />
            <input
              type="text"
              id="bottomText"
              name="bottomText"
              placeholder="Enter your text"
              value={props.meme.bottomText}
              onChange={props.handleInputChange}
            />
          </div>
        </div>
        <button onClick={props.getMemeImage} className="content-button">
          Get a new meme image
          <img src={magicWandIcon} alt="Magic Wand" />
        </button>
      </div>
      <div className="meme-container">
        <p className="top-text meme">{props.meme.topText}</p>
        <img
          src={props.meme.randomImage || props.getMemeImage()}
          alt="meme"
          className="meme-img"
        />
        <p className="bottom-text meme">{props.meme.bottomText}</p>
      </div>
    </main>
  );
}

Meme.propTypes = {
  meme: PropTypes.shape({
    topText: PropTypes.string,
    bottomText: PropTypes.string,
    randomImage: PropTypes.string,
  }),
  handleInputChange: PropTypes.func.isRequired,
  getMemeImage: PropTypes.func.isRequired,
};
