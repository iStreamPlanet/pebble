import React from 'react';
import PropTypes from 'prop-types';
import Radio from './Components/Radio';
import Text from '../Text/Text';

const propTypes = {
  /**
   * Additional classes to add
   */
  className: PropTypes.string,
  /**
   * Additional hint displayed beneath the label
   */
  helpText: PropTypes.node,
  /**
   * Name attribute applied to all radios
   */
  name: PropTypes.string.isRequired,
  /**
   * Callback function when a radio is changed
   */
  onChange: PropTypes.func,
  /**
   * Radio options
   */
  radios: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      helpText: PropTypes.node,
      value: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    }),
  ).isRequired,
  /**
   * The label for the group of radios
   */
  title: PropTypes.string,
  /**
   * Currently selected option value
   */
  value: PropTypes.string,
};

const defaultProps = {
  onChange: undefined,
};

/**
 * A way to select a single option from a list of options.
 *
 * ---
 */

function FieldRadioGroup({
  className,
  helpText,
  radios,
  title,
  value,
  onChange,
  name,
}) {
  // set the selected radio button or the first one
  const getRadioItems = () => {
    if (radios && radios.length > 0) {
      const selected =
        value === '' || value === undefined
          ? radios[0].value
          : radios[radios.findIndex((radio) => radio.value === value)]
              .value;

      return radios.map((radio) =>
        selected === radio.value
          ? { ...radio, ...{ isSelected: true, name } }
          : radio,
      );
    }
  };

  const radioMarkup = (radios) => {
    if (radios && radios.length > 0) {
      return radios.map((radio) => (
        <Radio
          disabled={radio.disabled}
          key={radio.id}
          id={radio.id}
          label={radio.label}
          helpText={radio.helpText}
          isSelected={radio.isSelected}
          name={radio.name}
          onChange={onChange}
          value={radio.value}
        />
      ));
    }
  };

  const titleMarkup = () => {
    if (title) {
      return <legend className="fw-700 db mb-2">{title}</legend>;
    }
  };

  const helpTextMarkup = () => {
    if (helpText === undefined) return;
    return (
      <Text size="6" className="db mb-3">
        {helpText}
      </Text>
    );
  };

  return (
    <div className={className}>
      <fieldset>
        {titleMarkup()}
        {helpTextMarkup()}
        {radioMarkup(getRadioItems())}
      </fieldset>
    </div>
  );
}

FieldRadioGroup.propTypes = propTypes;
FieldRadioGroup.defaultProps = defaultProps;
FieldRadioGroup.displayName = 'FieldRadioGroup';

export default FieldRadioGroup;
