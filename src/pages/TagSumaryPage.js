// Libs
import React from 'react';

// Helpers
import { Redirect, useHistory } from 'react-router-dom';
import { useOrderManager, Tag } from '../helpers/use-order';

// style Components
import Header from '../components/styleComponents/Header';
import AppBody from '../components/styleComponents/AppBody';
import Button from '../components/styleComponents/Button';
import Footer from '../components/styleComponents/Footer';

// functional Components
import TagRenderer from '../components/Tag';
import Input from '../components/styleComponents/Input';
import SummaryTable from '../components/styleComponents/SummaryTable';

// Styles
import styles from '../styles/styles';

export default function TagSumaryPage() {
  const history = useHistory();
  const orderManager = useOrderManager();
  const { order } = orderManager;
  const itens = order.purchase_units[0].itens;

  const handleChange = (index, newQuantity) => {
    orderManager.changeItemQuantity(index, newQuantity);
  };

  const handleDelete = (index) => {
    orderManager.removeTag(index);
  };

  const editTag = (tag, index) => {};

  const handleDesignAnother = () => {
    history.push('/tag-constructor');
  };

  const handlePurchaseClick = () => {
    history.push('/tag-constructor/shipping');
  };

  React.useEffect(() => {
    // console.log(itens);
  }, [orderManager]);

  return (
    <>
      {itens.length > 0 ? (
        <>
          <Header subtitle="Designed Tags">
            <Button onClick={() => history.push('/')} icon={'home'} />
            <Button
              onClick={() => history.push('/tag-constructor')}
              icon={'navigate_before'}
            />
          </Header>
          <AppBody>
            {itens.map((item, index) => {
              const tag = new Tag({}, item.stringifyTag);
              const quantity = parseInt(item.quantity);
              const { typedName, fontFamily, insideColor, outsideColor } = tag;
              return (
                <div
                  key={index}
                  style={{
                    ...styles.divFlexRow,
                    ...styles.cardParent,
                  }}
                >
                  <TagRenderer
                    size={90}
                    tag={tag}
                    spaceBetween={0}
                    startPosition={0}
                  />
                  <div style={styles.card}>
                    <span style={{ marginTop: '10px' }}>
                      Tag Name:{' '}
                      <span style={{ color: '#25292b' }}>{typedName}</span>
                    </span>
                    <span style={{ marginTop: '10px' }}>
                      Font Type:{' '}
                      <span style={{ color: '#25292b' }}>{fontFamily}</span>
                    </span>
                    <span style={{ marginTop: '10px' }}>
                      Colors:{' '}
                      <span style={{ color: '#25292b' }}>
                        {insideColor + ' & ' + outsideColor}
                      </span>
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                    }}
                  >
                    <Input
                      width={
                        item.quantity.length > 3
                          ? 60
                          : item.quantity.length === 3
                          ? 48
                          : item.quantity.length === 2
                          ? 39
                          : item.quantity.length === 1
                          ? 32
                          : 32
                      }
                      label={'Qtd'}
                      type={'number'}
                      value={quantity}
                      onChange={(newNumber) => handleChange(index, newNumber)}
                    />
                    <div style={{ display: 'flex' }}>
                      {/* <Button
                        onClick={() => editTag(tag, index)}
                        icon={'edit'}
                      /> */}
                      <Button
                        onClick={() => handleDelete(index)}
                        icon={'delete_forever'}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            <SummaryTable order={order} />
            <div style={styles.divFlexRow}>
              <Button
                style={{
                  ...styles.btnFilledPurple,
                  margin: '0px 10px 0px 0px',
                }}
                onClick={handleDesignAnother}
              >
                Design Another
              </Button>
              <Button
                style={{
                  ...styles.btnFilledPurple,
                  margin: '0px 0px 0px 10px',
                }}
                onClick={handlePurchaseClick}
              >
                Purchase
              </Button>
            </div>
          </AppBody>
          <Footer />
        </>
      ) : (
        <Redirect
          to={{
            pathname: '/tag-constructor',
          }}
        />
      )}
    </>
  );
}
