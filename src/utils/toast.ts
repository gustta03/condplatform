import { toast, Renderable } from 'react-hot-toast'

const toasts = {
  sucessNotification: (message: Renderable): void => {
    toast.success(message, {
      position: 'bottom-left',
      duration: 2000,
      style: {
        backgroundColor: 'green',
        color: '#fff',
      },
    });
  },

  errorNotification: (messsage: Renderable): void => {
    toast.error(messsage, {
      position: 'bottom-left',
      duration: 2000,
      style: {
        backgroundColor: 'red',
        color: '#fff',
      },
    });
  },
};

export { toasts };
