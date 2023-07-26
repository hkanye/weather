import './App.css';
import { Input } from 'antd';
import axios from './util/axios';

const { Search } = Input;

function App() {

  const onSearch = value => {
    // 调用接口，获取当前城市的天气信息
    console.log(value);
    axios.get('/getWeather', {
      params: {
        city: value,
      }
    }).then((response) => {
      console.log(response.data);
    }
    ).catch((error) => {
      console.log(error);
    }
    );
  };

  return (
    <div className="App">
      <Search
        placeholder="请输入城市名称"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        style={{ width: 500 }}
      />
      
    </div>
  );
}

export default App;
