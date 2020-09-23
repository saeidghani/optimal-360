import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { notification } from 'antd';
import PropTypes from 'prop-types';

const NotifContext = React.createContext(null);

const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const dispatch = useDispatch();
  const { notification: _notification, lastChange } = useSelector((state) => state?.util);

  console.log({ _notification, lastChange });

  const openNotification = React.useCallback(
    (placement, val) => {
      api.info({
        message: `Notification ${placement}`,
        description: val,
        placement,
        onClose: () => dispatch.util.alert(''),
      });
    },
    [dispatch.util, api],
  );

  React.useEffect(() => {
    if (_notification) {
      openNotification('topRight', _notification);
    }
  }, [lastChange, _notification, openNotification]);

  return (
    <NotifContext.Provider value={{ name: 'notif provider', alert: openNotification }}>
      {contextHolder}

      {children}
    </NotifContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotificationProvider;
