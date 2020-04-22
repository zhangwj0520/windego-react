import React, { useRef, useEffect } from 'react'

const id = `watermark-${Math.random().toString(36).substring(2)}`

interface Props {
  content?: string
}

const getImgUrl = ({
  width = 400,
  textAlign = 'center',
  textBaseline = 'middle',
  font = 20,
  opacity = 0.2,
  content = '水印',
  rotate = 30,
} = {}) => {
  const ANGLE = (rotate * Math.PI) / 180
  const height = width * Math.tan(ANGLE)

  const canvas: any = document.createElement('canvas')

  canvas.setAttribute('width', width)
  canvas.setAttribute('height', height)
  const ctx = canvas.getContext('2d')
  // 样式
  ctx.textAlign = textAlign
  ctx.textBaseline = textBaseline
  ctx.font = `${font}px monospace`
  ctx.fillStyle = `rgba(120, 120, 120, ${opacity})`
  ctx.strokeStyle = `rgba(120, 120, 120, ${opacity})`
  ctx.lineWidth = 5

  // 旋转
  ctx.translate(width / 2, height / 2)
  ctx.rotate(-ANGLE)
  ctx.translate(-width / 2, -height / 2)

  // 纯文字
  ctx.fillText(content, width / 2, height / 2)

  //* 印章风
  // const RATIO=10;
  // ctx.beginPath();
  // ctx.arc(width / 2, height / 2, (width * RATIO) / 2, 0, Math.PI * 2, true);
  // ctx.moveTo((width * (1 - RATIO)) / 2, height / 2);
  // ctx.lineTo((width * (1 + RATIO)) / 2, height / 2);
  // ctx.stroke();
  // ctx.fillText(content, width / 2, height / 3);
  // ctx.fillText('zhang', width / 2, (height * 2) / 3);

  return canvas.toDataURL()
}

const initAttribute = (content: any) => {
  const base64Url = getImgUrl({ content })
  const watermarkDiv: HTMLElement = document.getElementById(id) || document.createElement('div')
  const styleStr = `
      position: fixed!important;
      top: 0!important;
      bottom: 0!important;
      left: 0!important;
      right: 0!important;
      margin: 0!important;
      padding: 0!important;
      transform: none!important;
      width: auto!important;
      height: auto!important;
      scale: 1!important;
      rotate: none!important;
      display: block!important;
      visibility: visible!important;
      opacity: 1!important;
      color:#F00;
      z-index: 99999999999999!important;
      pointer-events: none;
      background-repeat: repeat!important;
      background-image: url(${base64Url})!important;
      background-size: auto!important;
    `
  watermarkDiv.setAttribute('style', styleStr)
}

/**
 * 监测水印自身，自身属性有任何变化，就初始化 target 的属性，包括：
 *      重设 data-watermarkid（parentObserver 依赖此值）
 *      重设 style
 *
 * 等于是锁定了 target 的部分属性
 */
const observeSelf = (watermark: any, content: string) => {
  const options = {
    attributes: true,
    attributeOldValue: true,
  }
  const callback = (observer: any) => {
    // for (const _mutation of mutationsList) {
    //   observer.disconnect();
    //   initAttribute(content);
    //   // console.log(mutation.target);
    //   observer.observe(watermark, options);
    // }

    observer.disconnect()
    initAttribute(content)
    observer.observe(watermark, options)
  }
  const observer = new MutationObserver(callback)
  observer.observe(watermark, options)

  return observer
}

const insertClone = (target: any, watermark: any, content: string) => {
  const clonedWaterMark = watermark.cloneNode(true)
  observeSelf(clonedWaterMark, content)
  target.appendChild(clonedWaterMark)
}

/**
 * 用于监测水印是否被移除，移除的话：
 *      - 父节点下插入新的水印
 *      - observe 新的水印
 */
const observeParent = (watermark: any, content: string) => {
  const parent: Node = watermark.parentNode
  const options = {
    childList: true,
  }
  const callback = (mutationsList: any) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const mutation of mutationsList) {
      const removed = mutation.removedNodes[0]
      if (removed && removed.dataset.watermarkid === id) {
        const { target } = mutation
        insertClone(target, watermark, content)
      }
    }
  }

  const observer = new MutationObserver(callback)
  observer.observe(parent, options)

  return observer
}

const WaterMark: React.FC<Props> = ({ content }) => {
  const CanvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const str = content || '水印'
    initAttribute(str)
    const watermark: any = CanvasRef.current
    observeSelf(watermark, str)
    observeParent(watermark, str)
  }, [content])

  return <div className="WaterMark" id={id} data-watermarkid={id} ref={CanvasRef} />
}

export default WaterMark
