"use client";

import { useAccount } from '@/app/(ui)/dashboard/account/hooks';
import { Button, Flex, Modal } from 'antd';
import React, { useEffect } from 'react';

import { AccountTable } from './components/AccountTable';
import { AccountForm } from './components/AccountForm';

export default function AccountPage() {
  const {
    isFormModalOpen,
    setIsFormModalOpen,
    setFormData,
    formData,
    data,
    onEdit,
    onDelete,
    onConfirm,
    onCancel,
    setPagination,
    pagination
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

    <AccountTable pagination={pagination} data={data} onDelete={onDelete} onEdit={onEdit} />

    <Modal title={'form-modal'} open={isFormModalOpen} onClose={() => {
    }} onOk={() => {
      setIsFormModalOpen(false)
    }} onCancel={() => {
      setIsFormModalOpen(false)
    }} footer={<></>}>
      <AccountForm data={formData} onConfirm={onConfirm} onCancel={onCancel} />
    </Modal>
  </>
}
