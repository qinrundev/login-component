import { useModel } from 'umi';
import logo from '@/assets/logo.svg';
import styles from './index.less';

const MenuHeader: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="logo" />
      {!initialState?.collapsed && (
        <span className={styles.name}>瑶光 IDaaS 平台</span>
      )}
    </div>
  );
};

export default MenuHeader;
