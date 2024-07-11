"use client";

import { useAccountForm, useAccountTableList } from '@/app/(ui)/dashboard/account/hooks';
import { Button, Flex, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Account } from '@/app/_type';
import { deleteAccountById } from '@/app/_service/account';

export default function AccountPage() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Account>>({
    name: '测试name'
  });

  const { render: renderTable, refresh } = useAccountTableList({
    onEdit: (data) => {
      setIsFormModalOpen(true);
      setFormData(data)
    },
    onDelete: async ({ id }) => {
      id && await deleteAccountById(id) && await refresh();
    }
  });
  const { render: renderForm } = useAccountForm(formData, async (data) => {
    setIsFormModalOpen(false)
    await refresh();
  }, () => {
    setIsFormModalOpen(false)
  })

  useEffect(() => {
    !isFormModalOpen && setFormData({})
  }, [isFormModalOpen]);

  return <>
    <Flex justify={'flex-end'} gap={10}>
      <Button onClick={() => {
        setIsFormModalOpen(true)
      }}>添加</Button>
    </Flex>
    {renderTable()}

    <Modal title={'form-modal'} open={isFormModalOpen} onClose={() => {
    }} onOk={() => {
      setIsFormModalOpen(false)
    }} onCancel={() => {
      setIsFormModalOpen(false)
    }} footer={<></>}>
      {renderForm()}
    </Modal>
  </>
}
