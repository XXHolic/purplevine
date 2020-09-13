import React, {useEffect} from 'react';
import Table from 'components/table';
import ErrorBoundary from 'components/error-boundary';
import request from 'util/request';
import styles from './index.module.css';



function Home() {

  useEffect(() => {
    request({type: 'get', url: "/api/issue/list"}).then((data) =>{
      console.info('run success1',data);
    });
  },[])

  const test = () => {
    const a = null;
    var b = a.test;
  }

  return (
    <ErrorBoundary>
      <div className={styles.page} onClick={test}>
        <Table></Table>
      </div>
    </ErrorBoundary>
  );
}

export default Home;
