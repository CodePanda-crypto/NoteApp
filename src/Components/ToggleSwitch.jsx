// ToggleSwitch.jsx
import './ToggleSwitch.css';

const ToggleSwitch = ({ isOn, handleToggle }) => {
  return (
    <div className="toggle-switch">
      <input
        checked={isOn}
        onChange={handleToggle}
        className="toggle-switch-checkbox"
        id={`toggle-switch-new`}
        type="checkbox"
      />
      <label className="toggle-switch-label" htmlFor={`toggle-switch-new`}>
        <span className="toggle-switch-inner" />
        <span className="toggle-switch-switch" />
      </label>
    </div>
  );
};

import PropTypes from 'prop-types';

ToggleSwitch.propTypes = {
  isOn: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

export default ToggleSwitch;
