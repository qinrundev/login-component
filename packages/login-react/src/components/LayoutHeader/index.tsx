import { Layout } from 'antd';
import RightContent from '@/components/RightContent';
import styles from './index.less';
import MenuHeader from '../MenuHeader';

const { Header } = Layout;

const LayoutHeader: React.FC = () => (
  <Header className={styles.header}>
    <MenuHeader />
    <RightContent domainSelectable={false} />
  </Header>
);

export default LayoutHeader;
