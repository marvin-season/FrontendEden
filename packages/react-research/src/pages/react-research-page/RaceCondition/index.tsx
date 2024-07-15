// 竞态条件
import {useEffect, useState} from "react";
import {useRequest} from "@/hook/useRequest.ts";
import {queryApi} from "@/api/mock.ts";
import {Button} from "antd";

const RaceCondition = () => {
  const [info, setInfo] = useState<{ name?: string }>({})
  const [name, setName] = useState('hello')
  const request = useRequest(queryApi);

  useEffect(() => {
    let active = true;
    console.log('active', active)
    active && request.request({
      name: name
    }).then((res) => {
      if (res && active) {
        setInfo({name: res.data.name})
      }
    })

    return () => {
      active = false
    }
  }, [name]);

  return <>
    <Button onClick={() => setName(prevState => {
      return prevState + 'a'
    })}>click</Button>
    <h3>
      {
        info.name
      }
    </h3>
  </>
}

export default RaceCondition
