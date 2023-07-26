// 解析器

// 数据样例
// {
//   "coord": {
//       "lon": 121.4581,
//       "lat": 31.2222
//   },
//   "weather": [
//       {
//           "id": 802,
//           "main": "Clouds",
//           "description": "多云",
//           "icon": "03n"
//       }
//   ],
//   "base": "stations",
//   "main": {
//       "temp": 29.31,
//       "feels_like": 36.31,
//       "temp_min": 27.93,
//       "temp_max": 29.92,
//       "pressure": 1010,
//       "humidity": 87
//   },
//   "visibility": 10000,
//   "wind": {
//       "speed": 4,
//       "deg": 130
//   },
//   "clouds": {
//       "all": 40
//   },
//   "dt": 1690378415,
//   "sys": {
//       "type": 2,
//       "id": 2043475,
//       "country": "CN",
//       "sunrise": 1690319191,
//       "sunset": 1690368874
//   },
//   "timezone": 28800,
//   "id": 1796236,
//   "name": "Shanghai",
//   "cod": 200
// }

const dataText = {
  'temp': {
    'name': '温度',
    'unit': '℃',
  },
  'temp_min': {
    'name': '最低温度',
    'unit': '℃',
  },
  'temp_max': {
    'name': '最高温度',
    'unit': '℃',
  },
  'feels_like': {
    'name': '体感温度',
    'unit': '℃',
  },
  'pressure': {
    'name': '气压',
    'unit': 'hPa',
  },
  'humidity': {
    'name': '湿度',
    'unit': '%',
  },
  'visibility': {
    'name': '能见度',
    'unit': 'm',
  },
  'wind_speed': {
    'name': '风速',
    'unit': 'm/s',
  },
  'wind_deg': {
    'name': '风向',
    'unit': '°',
  },
  'clouds': {
    'name': '云量',
    'unit': '%',
  },
  'dt': {
    'name': '时间',
    'unit': '',
    'parser': (dt) => {
      const date = new Date(dt * 1000);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
  },
  'sunrise': {
    'name': '日出',
    'unit': '',
    'parser': dataText.dt.parser,
  },
  'sunset': {
    'name': '日落',
    'unit': '',
    'parser': dataText.dt.parser,
  },
  'name': {
    'name': '城市名',
    'unit': '',
  },
  'description': {
    'name': '天气',
    'unit': '',
  },
}

const dataModuleName = {
  'main': '主要数据',
  'todayTemp': '今日温度',
  'wind': '风速',
  'timeRange': '日照时间',
  'air': '空气质量',
}
  

const parseWeatherData = (data) => {
  const { name, main, weather } = data;
  const { temp, humidity } = main;
  const { description } = weather[0];
  return {
    main: {
      name,
      temp,
      description,
      dt,
    },
    todayTemp: {
      temp_max,
      temp_min,
      feels_like,
    },
    wind: {
      wind_speed,
      wind_deg,
      clouds,
    },
    timeRange: {
      sunrise,
      sunset,
    },
    air: {
      pressure,
      visibility,
      humidity,
    }
  };
}

