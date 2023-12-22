import { Table, Input, Button, Popconfirm, Space, Modal, Form, Tooltip, DatePicker } from "antd";
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from "react";
import { useEffect } from "react";
import CreateBtn from "./CreateBtn";
import dayjs from "dayjs";

const AppTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [form] = Form.useForm();

    const handleUpdateData = (updateData) => {
        const formattedData = updateData.map((item) => ({
            ...item,
            publish_date: dayjs(item.publish_date).format("YYYY-MM-DD")
        }));
        setData(formattedData);
        setSearchData(formattedData);
    }

    useEffect(() => {
        setLoading(true);
        fetch("http://jinli-regret.top/api/v1/application/listAll")
            .then(response => response.json())
            .then(responseData => {
                handleUpdateData(responseData);
                setLoading(false);
            })
            .catch(error => {
                alert(`Error fetching data:${error}`);
                setLoading(false);
            })
    }, [])

    const handleSearch = value => {
        const filteredData = data.filter(item => item.app_name.toLowerCase().includes(value.toLowerCase()));
        setSearchData(filteredData);
        setSearchKeyword(value);
    }

    const handleDelete = id => {
        setLoading(true);
        fetch(`http://jinli-regret.top/api/v1/application/remove/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(() => {
            const updateData = data.filter(item => item._id !== id);
            setData(updateData);
            setSearchData(updateData);
            setLoading(false);
        }).catch(error => {
            alert(`Error!${error}`);
            setLoading(false);
        })
    }

    const onClose = () => {
        setVisible(false);
        setCurrentRecord(null);
    }

    const handleEdit = record => {
        setVisible(true);
        form.setFieldsValue({
            ...record,
            publish_date: dayjs(record.publish_date)
        });
        setCurrentRecord(record);
    }

    const handleSave = () => {
        form.validateFields().then(values => {
            setLoading(true);
            const id = currentRecord._id;
            const updateData = {
                ...values,
                publish_date: dayjs(values.publish_date).format("YYYY-MM-DD")
            };
            console.log(updateData);
            fetch(`http://jinli-regret.top/api/v1/application/update/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateData)
            }).then(() => {
                const updateList = data.map(item => {
                    if (item._id === id) {
                        return {
                            ...item,
                            ...updateData,
                        };
                    }
                    return item;
                });
                setData(updateList);
                setSearchData(updateList);
                setLoading(false);
                onClose();
            }).catch(error => { alert(`Error!${error}`); setLoading(false) })
        }).catch(error => alert(`Error!!!${error}`));
    }

    const columns = [
        {
            title: '应用名称',
            dataIndex: 'app_name',
            key: 'app_name',
            render: (text) => <a href={`https://baike.baidu.com/item/${text}`}>{text}</a>,
            width: 150,
        },
        {
            title: '应用描述',
            dataIndex: 'app_desc',
            key: 'app_desc',
            ellipsis: {
                showTitle: false
            },
            render: (text) => (
                <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
            )
        },
        {
            title: '上传日期',
            dataIndex: 'publish_date',
            key: 'publish_date',
            sorter: (a, b) => Date.parse(a.publish_date) - Date.parse(b.publish_date),
            width: 150,
        },
        {
            title: '应用图标',
            key: 'icon',
            dataIndex: 'icon',
            render: (icon) => <img src={icon} alt="应用图标" style={{ width: '40px', height: '40px' }} />,
        },
        {
            title: '操作',
            dataIndex: 'option',
            key: '_id',
            width: 250,
            render: (_text, record) => <Space><Popconfirm title="确认删除？" onConfirm={() => handleDelete(record._id)}><Button>删除</Button></Popconfirm>
                <Button onClick={() => handleEdit(record)}>编辑</Button>
            </Space>
        }
    ];
    return (
        <div style={{ width: 1000, margin: '0 auto' }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Input.Search
                    placeholder='输入应用名称'
                    allowClear
                    value={searchKeyword}
                    onChange={event => handleSearch(event.target.value)}
                    style={{
                        width: 250,
                    }}
                />
                <CreateBtn handleUpdateData={handleUpdateData} />
            </div>
            <div style={{ marginTop: 5 }}>
                <Table columns={columns} dataSource={searchData} loading={loading} rowKey="_id" />
            </div>
            <Modal
                forceRender
                visible={visible}
                onCancel={onClose}
                footer={[
                    <Button key="back" onClick={onClose}>
                        返回
                    </Button>,
                    <Button key="submit" type='primary' htmlType="submit" onClick={handleSave}>
                        保存
                    </Button>
                ]}
            >
                <Form form={form} labelCol={{ span: 6, }} wrapperCol={{ span: 16 }} layout="horizontal">
                    <Form.Item label="更改应用名" rules={[
                        {
                            required: true,
                            message: "应用名不能为空!"
                        },
                    ]}
                        name="app_name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="更改应用描述" name="app_desc" >
                        <TextArea />
                    </Form.Item>
                    <Form.Item label="更改日期" name="publish_date">
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="更改图标" name="icon">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default AppTable;