import React, { useEffect } from 'react'

function HealthCheck() {

  useEffect(() => {
    console.log(process.env.REACT_APP_INSTANCE_IP);
  }, []);

  return (
    <div>
      OK updated, new way {process.env.REACT_APP_INSTANCE_IP}
    </div>
  )
}

export default HealthCheck
