import { Account } from '@prisma/client';
import { Button, Flex, Table, Popconfirm } from 'antd';
import { FC } from 'react';

/** 
 * useAccountTableList 中的组件
 **/
export const AccountTable: FC<{ data: Partial<Account>[], onEdit?: (record: Account) => void, onDelete?: (id: number) => Promise<void> }>
    =
    ({ data, onEdit, onDelete }) => {

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
                            record.id && onDelete?.(record.id)
                        }}>
                            <Button danger>{'删除'}</Button>
                        </Popconfirm>

                    </Flex>
                }}></Table.Column>
            </Table>

        </>
    }