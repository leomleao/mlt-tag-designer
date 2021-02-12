import React from 'react';
import { useSelect } from 'react-select-search';

export const CustomComponents = () => {
  const options = [
    { value: 's', name: 'Small' },
    { value: 'm', name: 'Medium' },
    { value: 'l', name: 'Large' },
  ];

  return <CustomSelect options={options} value={'Select'} />;
};

function CustomSelect({ options, value, multiple, disabled }) {
  const [snapshot, valueProps, optionProps] = useSelect({
    options,
    value,
    multiple,
    disabled,
  });

  return (
    <div>
      <button {...valueProps}>{`Size: ${snapshot.displayValue}`}</button>
      {snapshot.focus && (
        <div>
          {snapshot.options.map((option) => (
            <div key={option.value}>
              <button {...optionProps} value={option.value}>
                {option.name}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
const configuration = {
  options: {
    type: 'array',
    default: [],
    description: 'Se the options documentation below',
  },
  value: {
    type: 'string, array',
    default: undefined,
    description: 'The value should be an array if multiple mode.',
  },
  multiple: {
    type: 'boolean',
    default: false,
    description: 'Set to true if you want to allow multiple selected options.',
  },
  search: {
    type: 'boolean',
    default: false,
    description: 'Set to true to enable search functionality',
  },
  disabled: {
    type: 'boolean',
    default: false,
    description: 'Disables all functionality',
  },
  placeholder: {
    type: 'string',
    default: 'empty string',
    description:
      'Displayed if no option is selected and/or when search field is focused with empty value.',
  },
  autoComplete: {
    type: 'string, on/off',
    default: 'off',
    description: 'Disables/Enables autoComplete functionality in search field.',
  },
  autoFocus: {
    type: 'boolean',
    default: 'false',
    description: 'Autofocus on select',
  },
  fuse: {
    type: 'object, boolean',
    default: 'true',
    description:
      'Use fuse.js to apply fuzzy search on search. Set to true to use default options or pass a fuse.js config option. If search is enabled and no filterOptions callback is passed, this will be set to true automatically.',
  },
  className: {
    type: 'string, function',
    default: 'select-search-box',
    description:
      'Set a base class string or pass a function for complete control. Se custom classNames for more.',
  },
  onChange: {
    type: 'function',
    default: null,
    description: 'Function to receive and handle value changes.',
  },
  printOptions: {
    type: 'string',
    default: 'auto',
    description:
      'Can be: auto, always, never, on-focus. This property controls when the options list should be rendered.',
  },
  closeOnSelect: {
    type: 'boolean',
    default: true,
    description:
      'The selectbox will blur by default when selecting an option. Set this to false to prevent this behavior.',
  },
  renderOption: {
    type: 'function',
    default: null,
    description:
      'Function that renders the options. See custom renderers for more.',
  },
  renderValue: {
    type: 'function',
    default: null,
    description:
      'Function that renders the value/search field. See custom renderers for more.',
  },
  renderGroupHeader: {
    type: 'function',
    default: null,
    description:
      'Function that renders the group header. See custom renderers for more.',
  },
  getOptions: {
    type: 'function',
    default: null,
    description:
      'Get options through a function call, can return a promise for async usage. See get options for more.',
  },
};

const optionsObject = {
  name: {
    type: 'string',
    description: 'The name of the option',
    required: true,
  },
  value: {
    type: 'string',
    description: 'The value of the option',
    required: 'true, if the type is not "group"',
  },
  type: {
    type: 'string',
    description:
      'If you set the type to "group" you can add an array of options that will be grouped',
    required: false,
  },
  itens: {
    type: 'array',
    description:
      'Array of option objects that will be used if the type is set to "group"',
    required: 'true, if type is set to "group"',
  },
  disabled: {
    type: 'boolean',
    description: 'Set to true to disable this option',
    required: false,
  },
};
