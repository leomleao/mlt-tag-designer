// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Helpers
import { useHistory } from 'react-router-dom';
import { useOrderManager } from '../helpers/use-order';

// style Components
import Header from '../components/styleComponents/Header';
import AppBody from '../components/styleComponents/AppBody';
import Button from '../components/styleComponents/Button';
import Footer from '../components/styleComponents/Footer';

// functional Components
import TagRenderer from '../components/Tag';
import DiscProperties from '../components/DiscProperties';
import LoadingComponent from '../components/styleComponents/LoadingComponent';
import { Tag } from '../utils/Tag';

// Styles
import styles from '../styles/styles';

export default function TagConstructorPage({ showMessage }) {
  const history = useHistory();

  const orderManager = useOrderManager();
  const { order, availability } = orderManager;

  const [tag, setTag] = React.useState(() => new Tag());

  const handleTagChange = (newTag) => {
    setTag(new Tag(newTag));
  };

  const handleHistoryClick = () => {
    setTag(new Tag());
  };

  const handleFinishClick = () => {
    if (tag.typedName === '') {
      showMessage({
        code: 'tag/missingName',
        message:
          'Your tag dont have a name. Please type a name to produce the tag.',
      });
    } else {
      orderManager.addTag(tag);
      history.push('/tag-constructor/sumary');
    }
  };

  return (
    <>
      <Header>
        <Button onClick={handleHistoryClick} icon={'history'} />
        <Button onClick={() => history.push('/')} icon={'navigate_before'} />
      </Header>
      <AppBody>
        <TagRenderer size={200} tag={tag} styles={{ margin: '20px' }} />
        {availability ? (
          <DiscProperties
            availability={orderManager.availability}
            tag={tag}
            onChange={handleTagChange}
          />
        ) : (
          <LoadingComponent height={'240px'} />
        )}

        <div style={styles.divFlexRow}>
          {order.purchase_units[0].itens.length > 0 && (
            <Button
              style={{ ...styles.btnFilledPurple, margin: 'auto' }}
              onClick={() => history.push('/tag-constructor/sumary')}
            >
              Go to Cart
            </Button>
          )}
          <Button
            style={{ ...styles.btnFilledPurple, margin: 'auto' }}
            onClick={handleFinishClick}
            icon={''}
          >
            Finish Design
          </Button>
        </div>
      </AppBody>
      <Footer />
    </>
  );
}

TagConstructorPage.propTypes = {
  showMessage: PropTypes.func.isRequired,
};
