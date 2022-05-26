import { Menu, Dropdown } from 'antd';
import { useModel, history } from 'umi';
import cx from 'classnames';
import { setCurrentDomain } from '@/utils/domain';
import styles from './index.less';

const DomainSelector: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { domains = [], currentDomain } = initialState || {};

  const selectDomain = (id: string) => {
    if (id !== currentDomain?.id) {
      setCurrentDomain(id);
      // refresh page
      window.location.href = history.location.pathname;
      }
  };

  const menu = (
    <Menu>
      {domains.map((d) => (
        <Menu.Item
          key={d.id}
          className={cx({
            [styles.selected]: d.id === currentDomain?.id,
          })}
          onClick={() => selectDomain(d.id)}
        >
          {d.name}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <div style={{ cursor: 'pointer' }}>当前域：<b>{currentDomain?.name}</b></div>
    </Dropdown>
  );
};

export default DomainSelector;
