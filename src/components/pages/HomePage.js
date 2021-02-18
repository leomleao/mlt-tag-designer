import React from 'react';

import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../helpers/use-auth';

import AppBody from '../AppBody';
import Footer from '../Footer';
import Header from '../Header';
import Button from '../Button';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import TagDisplay from '../TagDisplay';

export default function HomePage() {
  const auth = useAuth();
  const user = auth.user;
  let location = useLocation();
  let history = useHistory();
  const [showModal, setShowModal] = React.useState(false);

  const heights = {
    header: 21,
    appBody: 64,
    footer: 15,
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onSignOut = () => {
    auth.signout(() => history.push('/'));
    handleCloseModal();
  };

  return (
    <>
      <Header style={{ height: `${heights.header}vh` }}>
        <Button onClick={handleOpenModal} icon={'settings'} text={''} />
        <Modal
          styles={{
            modal: { position: 'absolute', right: '30%', top: '0px' },
          }}
          open={showModal}
          onClose={handleCloseModal}
          showCloseIcon={false}
        >
          {user ? (
            <div style={styles.modalFlexColumn}>
              {user.displayName && (
                <p>
                  Hello <br />
                  {user.displayName}!
                </p>
              )}
              <Button
                onClick={() => history.push('/user')}
                icon={'account_box'}
                text={'Profile'}
              />
              <Button
                onClick={() => history.push('/user/payments')}
                icon={'account_balance_wallet'}
                text={'Payments'}
              />
              <Button
                onClick={() => history.push('/user/addresses')}
                icon={'location_on'}
                text={'Addresses'}
              />
              <Button
                onClick={() => history.push('/user/orders')}
                icon={'local_mall'}
                text={'Orders'}
              />
              <Button
                onClick={onSignOut}
                icon={'chevron_left'}
                text={'Logout'}
              />
            </div>
          ) : (
            <div style={styles.modalFlexColumn}>
              <Button
                onClick={() => history.push('/login')}
                icon={'account_circle'}
                text={'Login'}
              />
              <Button
                onClick={() => history.push('/register')}
                icon={'person_add'}
                text={'Register'}
              />
            </div>
          )}
        </Modal>
      </Header>
      <AppBody style={{ height: `${heights.appBody}vh` }}>
        <TagDisplay />
        <Button
          classNames="btn purple darken-2"
          onClick={() => history.push('/tag-constructor')}
          icon={''}
          text={'Design your tag'}
        />
      </AppBody>
      <Footer style={{ height: `${heights.footer}vh` }}>
        <Button onClick={() => history.push('/')} text={'Home'} />
        <Button
          onClick={() => history.push('/tag-constructor')}
          text={'Tag Designer'}
        />
        <Button
          onClick={() => history.push('/contact-form')}
          text={'Contact Us'}
        />
      </Footer>
    </>
  );
}

const styles = {
  modalFlexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
};

/**
 * ModalReference
 */
const ModalProperties = {
  open: {
    type: 'Boolean',
    default: 'required',
    description: 'Control if the modal is open or not',
  },
  onClose: {
    type: 'Function',
    default: 'required',
    description:
      'Fired when the Modal is requested to be closed by a click on the overlay or when user press esc key',
  },
  children: {
    type: 'Node',
    default: '',
    description: 'The content of the modal',
  },
  closeOnEsc: {
    type: 'Boolean',
    default: 'true',
    description: 'Is the modal closable when user press esc key',
  },
  closeOnOverlayClick: {
    type: 'Boolean',
    default: 'true',
    description: 'Is the modal closable when user click on overlay',
  },
  little: {
    type: 'Boolean',
    default: 'false',
    description:
      "Is the dialog centered (when you don't have a lot of content)",
  },
  showCloseIcon: {
    type: 'Boolean',
    default: 'true',
    description: 'Show the close icon',
  },
  closeIconSize: {
    type: 'Number',
    default: '28',
    description: 'Close icon size',
  },
  closeIconSvgPath: {
    type: 'Node',
    default: '',
    description: 'A valid svg path to show as icon',
  },
  classNames: {
    type: 'Object',
    default: '{}',
    description:
      'An object containing classNames to style the modal, can have properties "overlay" (classname for overlay div), "modal" (classname for modal content div), "closeIcon" (classname for close icon svg). You can customize the transition with "transitionEnter", "transitionEnterActive", "transitionExit", "transitionExitActive"',
  },
  styles: {
    type: 'Object',
    default: '{}',
    description:
      'An object containing the styles objects to style the modal, can have properties "overlay", "modal", "closeIcon"',
  },
  animationDuration: {
    type: 'Number',
    default: '500',
    description: 'Animation duration in milliseconds',
  },
};
