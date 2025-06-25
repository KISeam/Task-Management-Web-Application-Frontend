import React from 'react'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <div>
        <div>
            <div>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Root