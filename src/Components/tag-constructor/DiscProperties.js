import React from 'react';

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
      <div class="form__group field">
        <label className="form__label">
          Name
          <input
            type="input"
            className="form__field"
            placeholder="Name"
            id="name"
            required
          />
        </label>
      </div>
      <label>
        Type desired name:
        <input type="text" name="name" onChange={handleTypingName} />
      </label>
      <label>
        Select font:
        <select id="fontFamily" name="font" onChange={handleSelectFont}>
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
      </label>
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
