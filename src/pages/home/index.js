import React, {useEffect} from 'react';
import Table from 'components/table';
import ErrorBoundary from 'components/error-boundary';
import styles from './index.module.css';

function Home() {

  useEffect(() => {
    // fetch("http://localhost:9001/index").then(res => {
    //   console.info("res", res);
    // })
    // .catch(error => {
    //   console.log("Request Error", error);
    // });
    // throw '32'

  },[])

  const test = () => {
    console.info('ddd')
    throw 'ee';
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
