import React, {useEffect} from 'react';
import Table from 'components/table';
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

  return (
    <div className={styles.page}>
      <Table></Table>
    </div>
  );
}

export default Home;
