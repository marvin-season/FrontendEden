import {Button, Card, Descriptions, Flex, Modal, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import {getAccountById, getAccountList} from '@/app/_service/account';
import {Account} from '@/app/_type';

export const useAccountList = () => {
  const [data, setData] = useState<Account[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState<Account | null>(null);

  useEffect(() => {
    getAccountList().then((data) => {
      setData(data);
    });
  }, []);

  return {
    data,
    currentData,
    setData,
    render: () => {
      return <>
        <Modal title={'modal'} open={isModalOpen} onOk={() => {
          setIsModalOpen(false)
        }} onCancel={() => {
          setIsModalOpen(false)
        }}>
          <Card>
            {currentData && <Descriptions>
              <Descriptions.Item label={'ID'}>{currentData.id}</Descriptions.Item>
              <Descriptions.Item label={'名称'}>{currentData.name}</Descriptions.Item>
            </Descriptions>}
          </Card>

        </Modal>
        <Table dataSource={data}>
          <Table.Column title="ID" dataIndex="id" key="id"/>
          <Table.Column title="名称" dataIndex="name" key="name"/>
          <Table.Column title="操作" render={(_, record: Account, index) => {
            return <Flex gap={4}>
              <Button loading={false} type={'primary'} onClick={() => {
                setIsModalOpen(true);
                setCurrentData(record)
                getAccountById(record.id).then((data) => {
                  setCurrentData(data)
                })
              }}>{'查看'}</Button>
              <Button onClick={() => {
              }}>{'隐藏'}</Button>
            </Flex>
          }}></Table.Column>
        </Table>
      </>
    }

  }
}
