import React, {useEffect,useState} from 'react';



function Child(props) {
  const {prefix} = props;
  const [count, setCount] = useState(0);

  useEffect(() => {
    // request({type: 'get', url: "/api/issue/list"}).then((data) =>{
      // console.info('run success1',data);
      // dispatch({type:'list',data:data})
    // });
  },[])

const handleCount = () => {
  let newCount = count+1
  setCount(newCount)
}

console.info('child render')

  return (
    <div>
      <div>`${prefix}`child</div>
    <button onClick={handleCount}>click{count}</button>
    </div>
  );
}

export default Child;
