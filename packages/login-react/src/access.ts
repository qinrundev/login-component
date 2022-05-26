/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */

import type { CurrentUser } from '@/types/user';

export default function access(initialState: { currentUser?: CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.username === 'admin',
  };
}
