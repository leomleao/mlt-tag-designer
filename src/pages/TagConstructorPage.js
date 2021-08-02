// Libs
import React from 'react';

// Helpers
import { useHistory } from 'react-router-dom';
// import { useOrderManager } from '../helpers/use-order';

// style Components
import Header from '../components/styleComponents/Header';
import AppBody from '../components/styleComponents/AppBody';
import Button from '../components/styleComponents/Button';
import Footer from '../components/styleComponents/Footer';

// functional Components
// import TagRenderer from '../components/Tag';
import DiscProperties from '../components/DiscProperties';
import LoadingComponent from '../components/styleComponents/LoadingComponent';
// import { Tag } from '../helpers/use-order';

// Styles
import styles from '../styles/styles';

export default function TagConstructorPage({ changeOrder }) {
  const history = useHistory();
  const availability = null;
  // const [availability, setAvailability] = React.useState(() => {
  //   Promise.all([
  //     api.getAvailability('fontsArray'),
  //     api.getAvailability('insideColorArray'),
  //     api.getAvailability('outsideColorArray'),
  //   ])
  //     .then((values) => {
  //       setAvailability({
  //         fontsArray: values[0].data.array,
  //         insideColorArray: values[1].data.array,
  //         outsideColorArray: values[2].data.array,
  //       });
  //     })
  //     .catch((err) => {
  //       return null;
  //     });
  // });

  const [tag, setTag] = React.useState({
    typedName: '',
    fontFamily: 'serif',
    insideColor: 'black',
    outsideColor: 'white',
    quantity: 1,
  });

  const handleTagChange = (newTag) => setTag(newTag);

  const handleHistoryClick = () => {
    setTag({
      typedName: '',
      fontFamily: 'serif',
      insideColor: 'black',
      outsideColor: 'white',
      quantity: 1,
    });
  };

  const handleFinishClick = () => {
    changeOrder({ type: 'addTag', tag: tag });
    history.push('/tag-constructor/sumary');
  };

  return (
    <>
      <Header>
        <Button onClick={handleHistoryClick} icon={'history'} />
        <Button onClick={() => history.push('/')} icon={'navigate_before'} />
      </Header>
      <AppBody>
        {/* <Tag size={200} tag={tag} styles={{ margin: '20px' }} /> */}
        {availability ? (
          <DiscProperties
            availability={availability}
            tag={tag}
            onChange={handleTagChange}
          />
        ) : (
          <LoadingComponent height={240} />
        )}

        <Button
          style={{
            ...styles.btnFilledPurple,
            // this btn inst in a parent div with width, alignSelf is solution
            alignSelf: 'center',
          }}
          onClick={handleFinishClick}
          icon={''}
        >
          Finish Design
        </Button>
      </AppBody>

      {/* This empity <p> will load the fonts */}
      <p style={{ fontFamily: 'Serif', ...style }}>Serif</p>
      <p style={{ fontFamily: 'Arial', ...style }}>Arial</p>
      <p style={{ fontFamily: 'Monospace', ...style }}>Monospace</p>
      <p style={{ fontFamily: 'Chicle', ...style }}>Chicle</p>
      <p style={{ fontFamily: 'Fredoka One', ...style }}>Fredoka</p>
      <p style={{ fontFamily: 'Lemon', ...style }}>Lemon</p>
      <p style={{ fontFamily: 'Salsa', ...style }}>Salsa</p>
      <Footer />
    </>
  );
}

const style = { visibility: 'hidden', margin: '0px', fontSize: '0px' };
