

import styles from './kontoMyOrders.module.css';

interface Props {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const KontoMyOrders = ({ setError }: Props) => {
  return (
    <div>
      my orders
    </div>
  )
}

export default KontoMyOrders
