import { Button, Flex } from 'antd';
import React, { FC, useMemo } from 'react';
import { Account } from '@/app/_type';
import { Formik } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd'
import * as Y from 'yup';


const schema = Y.object().shape({
    name: Y.string().required('请输入名称'),
    operator: Y.string().required('请输入操作人'),
    phone: Y.string().required('请输入电话'),
});

export const AccountForm: FC<{ data: Partial<Account>, onConfirm: (value: Partial<Account>) => Promise<void>, onCancel: () => void }> = ({ data, onConfirm, onCancel }) => {
    const initialValues: Partial<Account> = useMemo(() => {
        return data;
    }, [data])

    const handleSubmit = async (values: Partial<Account>) => {
        onConfirm(values)
    }

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