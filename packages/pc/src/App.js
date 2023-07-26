import './App.css';
import { Input, message } from 'antd';
import axios from './util/axios';
import { dataText, parseWeatherData, dataModuleName } from "shared/lib/parser";
import { useState } from 'react';

const { Search } = Input;

function App() {

  const modules = Object.entries(dataModuleName);
  const [
    weatherData,
    setWeatherData,
  ] = useState(null);

  const onSearch = value => {
    // 调用接口，获取当前城市的天气信息
    console.log(value);
    // 兜底
    if (!value) {
      // 弹窗提示文案
      message.warning('请输入城市名称');
      return;
    }
    axios.get('/getWeather', {
      params: {
        city: value,
      }
    }).then((response) => {
      console.log(response.data);
      // 兜底
      if (!response.data) {
        // 弹窗提示文案
        message.warning('数据获取失败');
        setWeatherData(null);
        return;
      }
      const weatherData = parseWeatherData(response.data);
      setWeatherData(weatherData);
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
      {weatherData && modules.map(([moduleName, moduleTitle]) => {
        const moduleData = weatherData[moduleName];
        const moduleKeys = Object.keys(moduleData);
        return (
          <div key={moduleName}>
            <h2>{moduleTitle}</h2>
            <div>
              {moduleKeys.map((key) => {
                const dataTextItem = dataText[key] || {};
                const { name, unit, parser } = dataTextItem;
                const value = moduleData[key];
                const parsedValue = parser ? parser(value) : value;
                if (!name) {
                  return null;
                }
                return (
                  <div key={key}>
                    {name}: {parsedValue} {unit}
                  </div>
                );
              })}
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default App;
