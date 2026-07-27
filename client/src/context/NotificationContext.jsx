import { createContext, useState } from "react";

export const NotificationContext = createContext();


export function NotificationProvider({ children }) {

  const [notifications, setNotifications] = useState([]);


  const addNotification = (
    title,
    message,
    type = "info"
  ) => {

    const notification = {

      id:
        Date.now(),

      title,

      message,

      type,

      read:false,

      createdAt:
        new Date(),

    };


    setNotifications(
      (prev)=>[
        notification,
        ...prev
      ]
    );

  };




  const markAsRead = (id)=>{

    setNotifications(
      prev =>
      prev.map(
        notification =>
        notification.id === id
        ?
        {
          ...notification,
          read:true
        }
        :
        notification
      )
    );

  };





  const removeNotification = (id)=>{

    setNotifications(
      prev => prev.filter(
        (notification) => notification.id !== id
      )
    );

  };



  const clearNotifications = ()=>{

    setNotifications([]);

  };




  return (

    <NotificationContext.Provider

      value={{

        notifications,

        addNotification,

        markAsRead,

        removeNotification,

        clearNotifications,

      }}

    >

      {children}

    </NotificationContext.Provider>

  );

}