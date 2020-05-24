---
category: sofa-map
order: 1
title: Circle 组件
---

## 何时使用

当需要在地图展示圆形覆盖物时使用；

## API

## 属性列表

| 属性 | 属性类型 | 值类型 | 默认取值 | 说明 |
|------|-----|-----|------|-----|
| center | 动态属性 | `LngLat` | `[]` | 必填，圆心位置 |
| radius | 动态属性 | `Number` | / | 必填，圆半径，单位:米 |
| circleOptions | 动态属性 | `Object` | `{}` | 可选，设置圆形的参数，见下文示例 |
| events | 动态属性 | `Object` | `{}` | 可选，设置 Circle 具有的事件，见下文示例  |

#### circleOptions

| 属性 | 属性类型 | 值类型 | 默认取值 | 说明 |
|------|-----|-----|------|-----|
| strokeColor| 动态属性 | `String` | / | 线条颜色，如‘#000000’、‘red’ |
| strokeWeight | 动态属性 | `Number` | / | 线宽 |
| fillColor | 动态属性 | `String` | #006600 | 圆形填充颜色,使用16进制颜色代码赋值。 |

#### events

与选用版本的高德地图API的Circle的事件保持一致；[高德官网](https://lbs.amap.com/api/javascript-api/reference/overlay#circle)

## 示例

```jsx
import { Map, Circle } from 'sofa-map';

const circleOptions = {
  strokeColor: '#cd23ae',
  strokeWeight: 3,
  fillColor: '#e66fd1',
};

const eventObjects = {
  mouseover: (e: any) => { console.log('Markers event mouseover', e); },
  click: (e: any) => { console.log('Markers event click', e); },
};

<Map style = { { width: '100%', height: '500px' } }>
  <Circle circleOptions={circleOptions} center={[116.368904, 39.913423]} radius={50} events={eventObjects} />
</Map>

```

## 注意
