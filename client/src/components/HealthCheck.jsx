import React from 'react'

function HealthCheck() {

  const {
    REACT_APP_COMMON_DATA_SERVICE_PORT,
    REACT_APP_AUTHENTICATION_SERVICE_PORT,
    REACT_APP_SEARCH_SUGGESTION_SERVICE_PORT,
    INSTANCE_IP
} = process.env

  return (
    <div>
      OK updated {INSTANCE_IP}
    </div>
  )
}

export default HealthCheck
