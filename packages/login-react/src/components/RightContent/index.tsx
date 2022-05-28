import { Space } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useModel, SelectLang } from 'umi';
import cx from 'classnames';
import DomainSelector from './DomainSelector';
import Avatar from './AvatarDropdown';
import styles from './index.less';

interface GlobalHeaderRightProps {
  domainSelectable?: boolean;
}

const GlobalHeaderRight: React.FC<GlobalHeaderRightProps> = ({ domainSelectable = true }) => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  return (
    <Space
      className={cx(styles.right, {
        [styles.dark]: (navTheme === 'dark' && layout === 'top') || layout === 'mix',
      })}
    >
      {domainSelectable && (
        <DomainSelector />
      )}
      <Avatar />
      <SelectLang className={styles.action} icon={<GlobalOutlined />} />
    </Space>
  );
};

export default GlobalHeaderRight;
