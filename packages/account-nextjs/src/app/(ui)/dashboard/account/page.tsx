"use client";

import {useAccountList} from '@/app/(ui)/dashboard/account/hooks';

export default function AccountPage() {
  const {render} = useAccountList();
  return <>
    <div>Account</div>
    {render()}
  </>
}
