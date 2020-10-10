import React, {useEffect,useState} from 'react';
import Child from './child'



function Parent(props) {
  const {prefix} = props;
  const [count, setCount] = useState(0);

  useEffect(() => {
    // request({type: 'get', url: "/api/issue/list"}).then((data) =>{
      // console.info('run success1',data);
      // dispatch({type:'list',data:data})
    // });
  },[])


  const getChild = () => {
    const arr = Array.from({length:4})
    return arr.map((ele,index) => {
      return <Child key={index}></Child>
    })
  }
  console.info('parent render')
  return (
    <div>
      {getChild().map(ele => ele)}
    </div>
  );
}

export default Parent;
