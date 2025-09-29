import type {FC} from "react";

interface CaughtErrorProps {
  status: number;
  statusText: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

const CaughtError: FC<CaughtErrorProps> = ({status, statusText, data}) => {
  if (status === 404) {
    return <div>Page Not Found</div>;
  } else {
    <div>
      <h1>
        {status} {statusText}
      </h1>
      <p>{data}</p>
    </div>;
  }
};
export default CaughtError;
