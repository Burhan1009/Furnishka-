import React, { useEffect } from 'react';

const RazorpayWidget = ({ amount,containerId  }) => {
  console.log({ amount })
  useEffect(() => {
    const widgetConfig = {
      "key": "rzp_live_KDfvp4POwTfFMu",
      "amount": amount,
      theme: {
        color: "#f15a21",
      },
      display: {
        widget: {
          main: {
            footer: {
              color: "black",
              fontSize: "12px",
              darkLogo: true,
            },
            link: {
              button: true,
              color: "#3A87048",
              fontSize: "12px",
            },
            discount: {
              color: "#f15a21",
            },
          },
        },
      },
    };
    const rzpAffordabilitySuite = new RazorpayAffordabilitySuite(widgetConfig);
    console.log({rzpAffordabilitySuite})

    rzpAffordabilitySuite.render('#razorpay-affordability-widget'); // Render into the specified container
  }, [amount]);

  return <div style={{ padding: 0, marginTop: 15,display:'flex',flexWrap:'wrap' }}
    id="razorpay-affordability-widget"></div>; // Render a div with the specified ID
};

export default RazorpayWidget;
