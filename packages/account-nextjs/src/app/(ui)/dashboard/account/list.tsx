"use client";

import {getAccountList} from "@/app/_service/account";
import React, {useEffect, useState} from "react";
import {Button, Flex, Table} from 'antd';

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
  useEffect(() => {
    getAccountList().then(setData)
  }, [])

  // 一个表格，类似antd的样式
  return <Table dataSource={data}>
    <Table.Column title="ID" dataIndex="id" key="id"/>
    <Table.Column title="名称" dataIndex="name" key="name"/>
    <Table.Column title="操作" render={(_, record, index) => {
      return <Flex gap={4}>
        <Button size={'small'} onClick={() => {
        }}>{'查看'}</Button>
        <Button size={'small'} onClick={() => {
        }}>{'隐藏'}</Button>
      </Flex>
    }}></Table.Column>
  </Table>
}
