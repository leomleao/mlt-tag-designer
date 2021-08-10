// Libs
import React from 'react';

// StepProgressBar package
import { ProgressBar, Step } from 'react-step-progress-bar';
import 'react-step-progress-bar/styles.css';

// Misc
import PropTypes from 'prop-types';

export default function Status({ status }) {
  const status_percentage = {
    CREATED: 16,
    PROCESSED: 50,
    POSTED: 83,
    RECEIVED: 100,
  };
  return (
    <div style={{ padding: '20px 40px 15px 38px' }}>
      <ProgressBar
        percent={status_percentage[status] || 16}
        height={6}
        filledBackground="#882aa2"
      >
        <Step>
          {({ accomplished }) => (
            <div
              style={accomplished ? styles.accomplished : styles.unaccomplished}
            >
              Created
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished }) => (
            <div
              style={accomplished ? styles.accomplished : styles.unaccomplished}
            >
              Processed
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished }) => (
            <div
              style={accomplished ? styles.accomplished : styles.unaccomplished}
            >
              Posted
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished }) => (
            <div
              style={accomplished ? styles.accomplished : styles.unaccomplished}
            >
              Received
            </div>
          )}
        </Step>
      </ProgressBar>
    </div>
  );
}

Status.propTypes = {
  status: PropTypes.string,
};

const styles = {
  unaccomplished: {
    color: 'white',
    height: '20px',
    fontSize: 'calc(8px + 0.5vmin)',
    borderRadius: '15px',
    padding: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(211, 211, 211, 0.7)',
  },
  accomplished: {
    color: 'white',
    height: '20px',
    fontSize: 'calc(8px + 0.5vmin)',
    borderRadius: '15px',
    padding: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#882aa2',
  },
};

// https://pierreericgarcia.github.io/react-step-progress-bar/
