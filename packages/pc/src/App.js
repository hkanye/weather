import './App.css';
import Animate from 'rc-animate';
import { Input, message, Descriptions } from 'antd';
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
  const [
    currentCity,
    setCurrentCity,
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
    // 是不是当前城市
    if (currentCity === value) {
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
        setCurrentCity(null);
        return;
      }
      const weatherData = parseWeatherData(response.data);
      setWeatherData(weatherData);
      setCurrentCity(value);
    }
    ).catch((error) => {
      console.log(error);
      // 提示信息
      message.error('数据获取失败');
      setWeatherData(null);
      setCurrentCity(null);
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
          <Descriptions bordered key={moduleName} title={moduleTitle} style={{ marginTop: 14 }} >
              {moduleKeys.map((key) => {
                const dataTextItem = dataText[key] || {};
                const { name, unit, parser } = dataTextItem;
                const value = moduleData[key];
                const parsedValue = parser ? parser(value) : value;
                if (!name) {
                  return null;
                }
                return (
                    <Descriptions.Item key={key} label={name}>{parsedValue}{unit}</Descriptions.Item>
                );
              })}
          </Descriptions>
        )
      })}
    </div>
  );
}

export default App;
