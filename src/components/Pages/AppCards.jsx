import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;
const AppCards = () => (
    <div className='container' style={{ display: 'flex', justifyContent: 'center' }}>

        <Card className='apps'
            hoverable
            style={{
                width: 240,
                margin: '0 10px',
                padding: 10
            }}
            cover={<img alt="example" src="https://5b0988e595225.cdn.sohucs.com/images/20190831/b28f0689e9ec4cb094e0946f338fff4a.jpeg" />}
        >
            <Meta title="应用1的名称" description="这是应用1的描述" />
        </Card>
        <Card className='apps'
            hoverable
            style={{
                width: 240,
                margin: '0 10px',
                padding: 10
            }}
            cover={<img alt="example" src="https://5b0988e595225.cdn.sohucs.com/images/20190831/b28f0689e9ec4cb094e0946f338fff4a.jpeg" />}
        >
            <Meta title="应用2的名称" description="这是应用2的描述" />
        </Card>
        <Card className='apps'
            hoverable
            style={{
                width: 240,
                margin: '0 10px',
                padding: 10
            }}
            cover={<img alt="example" src="https://5b0988e595225.cdn.sohucs.com/images/20190831/b28f0689e9ec4cb094e0946f338fff4a.jpeg" />}
        >
            <Meta title="应用3的名称" description="这是应用3的描述" />
        </Card>
        <Card className='apps'
            hoverable
            style={{
                width: 240,
                margin: '0 10px',
                padding: 10
            }}
            cover={<img alt="example" src="https://5b0988e595225.cdn.sohucs.com/images/20190831/b28f0689e9ec4cb094e0946f338fff4a.jpeg" />}
        >
            <Meta title="应用4的名称" description="这是应用4的描述" />
        </Card>
    </div>

);
export default AppCards;