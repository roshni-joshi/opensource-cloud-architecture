import React, { useEffect } from 'react';
import axios from "axios";

function HealthCheck() {

  useEffect(() => {
    console.log(process.env.REACT_APP_INSTANCE_IP);
    axios.get("http://csci5411-lb-999554601.us-east-1.elb.amazonaws.com:10000/default-search-suggestion")
      .then(data => {
        JSON.stringify(data)
        console.log("heath data:" + data)
      })
      .catch(error => {
        console.log("health error : " + error)
      })
  }, []);

  return (
    <div>
      OK updated, new way {process.env.REACT_APP_INSTANCE_IP}
    </div>
  )
}

export default HealthCheck
