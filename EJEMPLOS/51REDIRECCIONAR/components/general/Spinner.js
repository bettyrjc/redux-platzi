import React from 'react'
import '../../css/spinner.css'

const Spinner = (props) => {
  return (
    <div className="center">
       <div className="lds-spinner">
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
              </div>
    </div>
  )
}
export default Spinner