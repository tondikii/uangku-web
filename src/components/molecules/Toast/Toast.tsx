import {type FC} from "react";

interface ToastProps {
  show: boolean;
  action?: string;
  message?: string;
}

const Toast: FC<ToastProps> = ({show, action, message}) => {
  if (show) {
    return (
      <div className="toast toast-top toast-middle">
        <div className="alert alert-soft alert-success">
          <span className="text-xs">{action || "Action"} Successfully!</span>
        </div>

        {message && (
          <div className="alert alert-soft alert-success">
            <span className="text-xs">{message}</span>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default Toast;
