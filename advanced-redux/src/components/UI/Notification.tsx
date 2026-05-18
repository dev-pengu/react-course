import classes from './Notification.module.css';

type NotificationProps = {
  status: 'pending' | 'success' | 'error';
  title: string;
  message: string;
};

const Notification = ({status, title, message}: NotificationProps) => {
  let specialClasses = '';

  if (status === 'error') {
    specialClasses = classes.error;
  }
  if (status === 'success') {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
};

export default Notification;