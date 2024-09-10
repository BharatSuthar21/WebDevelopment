import React from 'react'

function Screen({input, output}) {
  return (
    <div className='screen'>
        <div>
            {input}
        </div>
        <div>
            {output}
        </div>
    </div>
  )
}

export default Screen