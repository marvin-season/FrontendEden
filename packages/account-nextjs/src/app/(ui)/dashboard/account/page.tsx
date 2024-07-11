"use client";

import { useAccount } from '@/app/(ui)/dashboard/account/hooks';
import { Button, Flex, Modal } from 'antd';
import React, { useEffect } from 'react';

import { AccountTable } from './components/AccountTable';

export default function AccountPage() {
  const {
    renderForm,
    isFormModalOpen,
    setIsFormModalOpen,
    setFormData,
    data,
    onEdit,
    onDelete
  } = useAccount();

  useEffect(() => {
    !isFormModalOpen && setFormData({})
  }, [isFormModalOpen]);

  return <>
    <Flex justify={'flex-end'} gap={10}>
      <Button onClick={() => {
        setIsFormModalOpen(true)
      }}>添加</Button>
    </Flex>

    <AccountTable data={data} onDelete={onDelete} onEdit={onEdit} />

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
