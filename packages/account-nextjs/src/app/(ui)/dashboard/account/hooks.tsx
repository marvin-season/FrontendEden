import {Button, Flex, Form, Input, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import {createAccount, getAccountList} from '@/app/_service/account';
import {Account} from '@/app/_type';

export const useAccountForm = (data: Partial<Account>, onConfirm: (value: Partial<Account>) => Promise<void>) => {
  const onFinish = async (values: Account) => {
    const result = await createAccount(values).then();
    await onConfirm(result)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return {
    render: () => {
      return <>
        <Form
          key={data.id}
          name="basic"
          initialValues={data}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{required: true, message: 'Please input your name!'}]}
          >
            <Input/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    }
  }
}

export const useAccountTableList = ({onEdit}: {
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
        <Table.Column title="ID" dataIndex="id" key="id"/>
        <Table.Column title="名称" dataIndex="name" key="name"/>
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
