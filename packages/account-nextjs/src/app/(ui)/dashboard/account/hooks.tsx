import { Button, Flex, Table, Popconfirm } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { saveOrUpdateAccount, getAccountList, deleteAccountById } from '@/app/_service/account';
import { Account } from '@/app/_type';
import { Formik } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd'
import * as Y from 'yup';

const schema = Y.object({
  name: Y.string().required('名称不能为空'),
  operator: Y.string().required('操作人不能为空'),
  phone: Y.string().required('电话不能为空'),
})

export const useAccountForm = (data: Partial<Account>, onConfirm: (value: Partial<Account>) => Promise<void>, onCancel: () => void) => {

  const initialValues: Partial<Account> = useMemo(() => {
    return data;
  }, [data])

  const handleSubmit = async (values: Partial<Account>) => {
    onConfirm(values)
  };

  return {
    render: () => {
      return <>
        <Formik
          key={data.id}
          onSubmit={handleSubmit}
          validationSchema={schema}
          initialValues={initialValues}
        >
          {
            (props) => {
              return <Form labelCol={{ span: 4 }} wrapperCol={{ span: 24 }}>
                <Form.Item name="name" label="名称">
                  <Input name="name" />
                </Form.Item>
                <Form.Item name="operator" label="操作人">
                  <Input name="operator" />
                </Form.Item>
                <Form.Item name="phone" label="电话">
                  <Input name="phone" />
                </Form.Item>
                <Flex justify='flex-end' gap={10}>
                  <Button onClick={() => {
                    props.resetForm();
                    onCancel();
                  }}>取消</Button>
                  <SubmitButton>提交</SubmitButton>
                </Flex>
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
    const data = await getAccountList({ pageSize: 6, pageNumber: 1 });
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
            <Popconfirm title={'确认删除'} onConfirm={async () => {
              record.id && await deleteAccountById(record.id) && await refresh();
            }}>
              <Button danger>{'删除'}</Button>
            </Popconfirm>

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


// 封装 Account 所有状态和操作的 hook
export const useAccount = () => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Account>>({
    name: '测试name'
  });
  const [data, setData] = useState<Account[]>([]);

  const refresh = async () => {
    const data = await getAccountList({ pageSize: 6, pageNumber: 1 });
    setData(data);
  }


  const { render: renderForm } = useAccountForm(formData, async (data) => {
    await saveOrUpdateAccount(data).then() && await refresh();
    setIsFormModalOpen(false)
  }, () => {
    setIsFormModalOpen(false)
  })

  useEffect(() => {
    refresh().then()
  }, []);

  useEffect(() => {
    !isFormModalOpen && setFormData({})
  }, [isFormModalOpen]);

  return {
    isFormModalOpen,
    setIsFormModalOpen,
    formData,
    setFormData,
    renderForm,
    refresh,
    data,
    setData,
    onEdit: (data: Partial<Account>) => {
      setIsFormModalOpen(true);
      setFormData(data)
    },
    onDelete: async (id: number) => {
      return await deleteAccountById(id).then() && await refresh();
    }
  }
}