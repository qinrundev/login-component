import { DefaultFooter } from '@ant-design/pro-layout';
import styles from  './index.less';

const Footer: React.FC = () => (
  <DefaultFooter
    className={styles.footer}
    copyright="2022 all rights reserved"
  />
);

export default Footer;
