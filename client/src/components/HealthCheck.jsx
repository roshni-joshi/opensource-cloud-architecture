import React from 'react'

function HealthCheck() {
  return (
    <div>
      OK status. Request is handled by instance with ip {process.env.REACT_APP_INSTANCE_IP}
    </div>
  )
}

export default HealthCheck
