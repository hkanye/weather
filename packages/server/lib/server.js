// 使用express调用OpenWeatherMap的api

const express = require('express');
const axios = require('axios');

const app = express();
const port = 3002;

const apiKey = 'a3795a600ffe8548a7f7b0f4026d7a40';
// 缓存
const weatherCache = {};

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ code: 500, error: 'Something went wrong' });
});

// 404中间件 
app.use((req, res, next) => {
  res.status(404).json({ code: 404, error: 'Sorry cant find that!' });
});

// 处理请求
app.get('/getWeather', async (req, res) => {
  try {
    const { city } = req.query;
    // 检查缓存
    if (weatherCache[city]) {
      console.log('Serving from cache');
      return res.json(weatherCache[city]);
    }
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=zh_cn`;
    // 调用OpenWeatherMap API
    const weatherResponse = await axios.get(url)

    // 从响应中提取所需的天气数据
    const weatherData = weatherResponse.data;
    // 缓存
    weatherCache[city] = weatherData;

    // 返回天气数据给客户端
    res.json(weatherData);
  } catch (error) {
    console.log(error);
    // 处理错误
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
