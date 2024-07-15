import React, {useState} from 'react';
import ReactPlayer from 'react-player';
import {Button, Input} from "antd";

// const url_ = 'https://hls.vdtuzv.com/videos3/1f10919af71d6f419d5d9f11b91996e4/1f10919af71d6f419d5d9f11b91996e4.m3u8?auth_key=1712212086-660e48764c9ff-0-2d73059c9417474c8f7d679ad8014a30&v=3&time=0';

const VideoPlayer = () => {

    const [value, setValue] = useState('')
    const [url, setUrl] = useState('url_')
    return (
        <div style={{
            display: "flex",

        }}>

            <div style={{
                width: '400px',
                overflow: 'auto'
            }}>

                <ReactPlayer
                    url={url}
                    controls
                    playing
                    width="100%"
                    height="auto"
                    config={{}}
                />

            </div>
            <Input value={value} onChange={e => {
                setValue(e.target.value)
            }}/>
            <Button onClick={() => {
                setUrl(value)
            }}>添加</Button>
        </div>

    );
};

export default VideoPlayer;
