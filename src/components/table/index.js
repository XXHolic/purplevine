import React, {useState,useEffect} from 'react';
import { Table as AntTable } from 'antd';
// import styles from './index.module.css';

const testData = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <span>{text}</span>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <span style={{ marginRight: 16 }}>Invite {record.name}</span>
        <span>Delete</span>
      </span>
    ),
  },
];

function Table() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});


  useEffect(() => {
    const fetch = () => {
      setLoading(true);
      const paginationCopy = {current:1,pageSize: 10,showSizeChanger:true};
      paginationCopy.total = 100;
      setData(testData);
      setPagination(paginationCopy);
      setLoading(false);
    }

    fetch()
  },[]);

  return (
    <>
      <AntTable columns={columns} dataSource={data} loading={loading} pagination={pagination} />
    </>
  );
}

export default Table;
