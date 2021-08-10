// Libs
import React from 'react';

// Helpers
import { useAuth } from '../helpers/use-auth';
import { useHistory, useLocation } from 'react-router-dom';
import { Tag } from '../utils/Tag';

// style Components
import Header from '../components/styleComponents/Header';
import AppBody from '../components/styleComponents/AppBody';
import Button from '../components/styleComponents/Button';
import Footer from '../components/styleComponents/Footer';
import LoadingComponent from '../components/styleComponents/LoadingComponent';

// functional Components
import SettingsButton from '../components/SettingsButton';
import Status from '../components/Status';
import TagRenderer from '../components/Tag';

// Styles
import styles from '../styles/styles';

// DataBank
import firestore from '../service/use-firestore';

export default function OrdersPage() {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = React.useState(false);

  const [orders, setOrders] = React.useState(() => {
    if (user) {
      setIsLoading(true);
      firestore.getOrdersByUid(user.uid).then((data) => {
        setIsLoading(false);
        return setOrders(data);
      });
    }
    return [];
  });

  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: '/' };

  return (
    <>
      <Header subtitle="My Orders">
        <SettingsButton />
        <Button onClick={() => history.push(from)} icon={'navigate_before'} />
      </Header>
      <AppBody>
        {isLoading ? (
          <LoadingComponent height={'80%'} />
        ) : (
          <>
            {orders.length > 0 ? (
              orders.map(
                (
                  { id, purchase_units, status, create_time, update_time },
                  order_index
                ) => {
                  return (
                    <div key={`order${order_index}`} style={styles.cardParent}>
                      <div>
                        {purchase_units[0].items.map(
                          ({ name, quantity, description }, item_index) => {
                            return (
                              <div
                                key={`item${item_index}`}
                                style={styles.divFlexRow}
                              >
                                <TagRenderer
                                  tag={new Tag(description)}
                                  size={60}
                                  spaceBetween={0}
                                />
                                <div
                                  style={{
                                    ...styles.card,
                                    flexDirection: 'row',
                                  }}
                                >
                                  <span style={{ margin: '12px' }}>
                                    Tag Name:{' '}
                                    <span style={{ color: '#25292b' }}>
                                      {name}
                                    </span>
                                  </span>
                                  <span style={{ margin: '12px' }}>
                                    Quantity:{' '}
                                    <span style={{ color: '#25292b' }}>
                                      {quantity}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            );
                          }
                        )}
                        <Status status={status} />
                        <div
                          style={{
                            ...styles.divFlexRow,
                            justifyContent: 'center',
                            fontSize: 'calc(6px + 1vmin)',
                          }}
                        >
                          <Button
                            icon={'email'}
                            style={styles.btnUnfilledGray}
                            onClick={() =>
                              history.push({
                                pathname: '/contact-form',
                                state: { order_id: id },
                              })
                            }
                          >
                            Inform a issue whith this order
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                }
              )
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  color: '#520369',
                  fontFamily: "'Quicksand', sans-serif",
                  margin: '1em',
                  fontWeight: '600',
                  fontSize: 'calc(8px + 1.5vmin)',
                }}
              >
                <div style={{ margin: '0.5em' }}>
                  You dont have any order created.
                </div>
                <div style={{ height: '30%' }} />
                <div
                  style={{
                    margin: '0.5em',
                    border: 'solid 2px #DCDCDC',
                    borderRadius: '10px',
                    padding: '0.5em',
                    cursor: 'pointer',
                  }}
                  onClick={() => history.push('/tag-constructor')}
                >
                  Check the designer page to created a custom tag
                </div>
              </div>
            )}{' '}
          </>
        )}
      </AppBody>
      <Footer defaultButtons />
    </>
  );
}
