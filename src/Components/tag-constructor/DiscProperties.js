import React from 'react';
import { CustomComponents } from '../CustomSelect';

export default function DiscProperties(props) {
  const {
    onFontSelected,
    onTypedName,
    onPositionSelected,
    onSpaceSelected,
  } = props;

  const handleTypingName = ({ target }) => {
    onTypedName(target.value);
  };

  const handleSelectFont = ({ target }) => {
    onFontSelected(target.value);
  };

  const handlePositionSelect = ({ target }) => {
    onPositionSelected(target.valueAsNumber);
  };

  const handleSpaceSelect = ({ target }) => {
    onSpaceSelected(target.valueAsNumber);
  };

  return (
    <div className="disc-properties">
      <CustomComponents />
      <div className="form__group field">
        <input
          type="text"
          className="form__field"
          placeholder="Desired name:"
          name="name"
          id="desiredName"
          onChange={handleTypingName}
        />
        <label htmlFor="desiredName" className="form__label">
          Desired name:
        </label>
      </div>
      <div className="form__group field">
        <select
          className="form__field"
          placeholder="Select font:"
          name="font"
          id="fontFamily"
          onChange={handleSelectFont}
        >
          <option value="serif">Serif</option>
          <option value="arial">Arial</option>
          <option value="courierNew">Courier New</option>
          <option value="cambria">Cambria</option>
          <option value="American Captain">American Captain</option>
          <option value="Bauhaus 93">Bauhaus 93</option>
          <option value="Berlin Sans FB Demi">Berlin Sans FB Demi</option>
          <option value="Cooper Black">Cooper Black</option>
          <option value="Forte">Forte</option>
          <option value="Gill Sans Ultra Bold Condensed">
            Gill Sans Ultra Bold Condensed
          </option>
          <option value="Hobo Std">Hobo Std</option>
          <option value="Nyam Regular">Nyam Regular</option>
          <option value="Showcard Gothic">Showcard Gothic</option>
          <option value="Stencil">Stencil</option>
          <option value="Tekton Pro">Tekton Pro</option>
          <option value="monospace">Monospace</option>
        </select>
        <label htmlFor="name" className="form__label">
          Select font:
        </label>
      </div>
      <label>
        Select starting point:
        <input
          type="range"
          name="start"
          min="0"
          max="360"
          step="1"
          onChange={handlePositionSelect}
        />
      </label>
      <label>
        Select space betwewn:
        <input
          type="range"
          name="space"
          min="0"
          max="1"
          step="0.0001"
          onChange={handleSpaceSelect}
        />
      </label>
    </div>
  );
}
