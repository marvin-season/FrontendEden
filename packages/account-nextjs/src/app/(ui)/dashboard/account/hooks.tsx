import { Button, Flex, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { createAccount, getAccountList } from '@/app/_service/account';
import { Account } from '@/app/_type';
import { Formik, useFormik } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd'
export const useAccountForm = (data: Partial<Account>, onConfirm: (value: Partial<Account>) => Promise<void>) => {
  const handleSubmit = async (values: Partial<Account>) => {
    console.log('values', values);
    // const result = await createAccount(values).then();
    // await onConfirm(values)
  };

  const formHandle = useFormik({
    initialValues: data,
    onSubmit: handleSubmit
  })

  return {
    render: () => {
      return <>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{ name: '' }}
        >
          {
            (props) => {
              return <Form>
                <Form.Item name="name" label="名称">
                  <Input name="name" />
                </Form.Item>
                <Form.Item name="operator" label="操作人">
                  <Input name="operator" />
                </Form.Item>
                <Form.Item name="phone" label="电话">
                  <Input name="phone" />
                </Form.Item>
                <SubmitButton>提交</SubmitButton>
              </Form>
            }
          }
        </Formik>
      </>
    }
  }
}

export const useAccountTableList = ({ onEdit }: {
  onEdit?: (record: Account) => void,
}) => {
  const [data, setData] = useState<Account[]>([]);

  const refresh = async () => {
    const data = await getAccountList();
    setData(data);
  }

  useEffect(() => {
    refresh().then()
  }, []);

  const render = () => {
    return <>
      <Table dataSource={data}>
        <Table.Column title="ID" dataIndex="id" key="id" />
        <Table.Column title="名称" dataIndex="name" key="name" />
        <Table.Column title="操作" render={(_, record: Account, index) => {
          return <Flex gap={4}>
            <Button loading={false} type={'primary'} onClick={() => {
              onEdit?.(record);

            }}>{'编辑'}</Button>
            <Button onClick={() => {
            }}>{'隐藏'}</Button>
          </Flex>
        }}></Table.Column>
      </Table>
    </>
  }

  return {
    data,
    setData,
    render,
    refresh
  }
}
