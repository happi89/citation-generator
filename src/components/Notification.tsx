const Notification = ({ message }: { message: string }) => {
  return (
    <div className="toast">
      <div className="alert alert-info">
        <div>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Notification;
