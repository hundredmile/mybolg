import React from 'react'

export default function darklight(props) {
  function changetheme(){     // 子组件接收props的函数
    props.changetheme()
  }
  return (
    <>
        <div className="theme-switcher">
            <input type="checkbox" id="switcher" onClick={changetheme}/>
            <label htmlFor="switcher">switch</label>
        </div>
    </>
  )
}
