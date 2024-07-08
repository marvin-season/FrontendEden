"use client";

import {getAccountList} from "@/app/_service/account";
import React, {useEffect, useState} from "react";
import {Button, Card, Descriptions, Flex, Modal, Table} from 'antd';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
]

export const List = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState<any>(null)
  useEffect(() => {
    getAccountList().then(setData)
  }, [])

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
      <Table.Column title="操作" render={(_, record, index) => {
        return <Flex gap={4}>
          <Button size={'small'} onClick={() => {
            setIsModalOpen(true);
            setCurrentData(record)
          }}>{'查看'}</Button>
          <Button size={'small'} onClick={() => {
          }}>{'隐藏'}</Button>
        </Flex>
      }}></Table.Column>
    </Table>
  </>
}
