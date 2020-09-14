import React, {useEffect,useReducer} from 'react';
import { Table } from 'antd';
import ErrorBoundary from 'components/error-boundary';
import request from 'util/request';
import styles from './index.module.css';

const columns = [
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    render: text => <span>{text}</span>,
  },
  {
    title: '信息',
    dataIndex: 'msg',
    key: 'msg',
    render: (text,row) => {
      if(row.exception) {
        return row.exception.msg
      }
      return ''
    }
  }
];

const initialState = {list: []};

function reducer(state, action) {
  switch (action.type) {
    case 'list':
      return {list: action.data.data};
    default:
      throw new Error();
  }
}

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    request({type: 'get', url: "/api/issue/list"}).then((data) =>{
      // console.info('run success1',data);
      dispatch({type:'list',data:data})
    });
  },[])

  const test = () => {
    const a = null;
    var b = a.name;
  }
  //

  return (
    <ErrorBoundary>
      <div className={styles.page} onClick={test} >
        <Table rowKey='eventId' dataSource={state.list} columns={columns}></Table>
      </div>
    </ErrorBoundary>
  );
}

export default Home;
