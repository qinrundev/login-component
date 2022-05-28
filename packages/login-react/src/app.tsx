import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import MenuHeader from '@/components/MenuHeader';
import { queryCurrentUser } from '@/services/user';
import { getDomainsByTenant } from '@/services/domain';
import { getCurrentDomain } from '@/utils/domain';
import type { CurrentUser } from '@/types/user';
import type { Domain } from '@/types/domain';
import defaultSettings from '../config/defaultSettings';

const loginPath = '/test/login';
const domainsPath = '/test/user';

export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState(): Promise<{
  fetchUserInfo?: () => Promise<CurrentUser | undefined>;
  currentUser?: CurrentUser;
  domains?: Domain[];
  currentDomain?: Domain;
  settings?: Partial<LayoutSettings>;
  collapsed?: boolean;
}> {
  const fetchUserInfo = async () => {
    try {
      const data = await queryCurrentUser();
      return {
        id: data.id,
        username: data.username,
        tenantId: data.tenantId,
        domainId: data.domainId,
        email: data.email,
        cellphone: data.cellphone,
        cellphoneNationCode: data.cellphoneNationCode,
      };
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  if (history.location.pathname !== loginPath) {
    // query user
    const currentUser = await fetchUserInfo();

    // query domain
    let domains: Domain[] = [];
    if (currentUser) {
      const data = await getDomainsByTenant(currentUser.tenantId);
      if (data && data.results && Array.isArray(data.results)) {
        domains = data.results;
      }
    }

    // get current selected domain
    const currentDomainId = getCurrentDomain();
    const currentDomain = domains.find((d) => d.id === currentDomainId);
    if (!currentDomain && history.location.pathname !== domainsPath) {
      history.push(domainsPath);
    }

    return {
      fetchUserInfo,
      currentUser,
      domains,
      currentDomain,
      settings: defaultSettings,
      collapsed: false,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
    collapsed: false,
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    disableContentMargin: false,
    onPageChange: () => {
      const { pathname } = history.location;
      if (!initialState?.currentUser) {
        // no current user
        if (pathname !== loginPath) {
          history.push(loginPath);
        }
      } else if (!initialState?.currentDomain) {
        // has current user, no current domain
        if (pathname !== domainsPath) {
          history.push(domainsPath);
        }
      }
    },
    onCollapse: (val) => {
      setInitialState({
        ...initialState,
        collapsed: val,
      });
    },
    rightContentRender: () => <RightContent />,
    footerRender: () => <Footer />,
    menuHeaderRender: () => <MenuHeader />,
    ...initialState?.settings,
  };
};
