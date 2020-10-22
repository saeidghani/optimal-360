import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { notification } from 'antd';
import PropTypes from 'prop-types';

const NotifContext = React.createContext(null);

const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const dispatch = useDispatch();
  const { notification: _notification, lastChange } = useSelector((state) => state?.util);

  const openNotification = React.useCallback(
    ({ message, type = 'info', placement = 'topRight', description }) => {
      api[type]({
        message,
        description,
        placement,
        duration: 3,
        onClose: () => dispatch.util.clearNotifications(),
      });
    },
    [dispatch.util, api],
  );

  React.useEffect(() => {
    if (_notification) {
      openNotification(_notification);
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
