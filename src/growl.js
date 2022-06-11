import React, { useEffect }from 'react'

import './growl.css'

export const Growl = ({ active, message, onDismissed }) => (
  <div className={`growl${active ? " active" : ""}`}>
    {message}
    <div onClick={onDismissed} className="growl-close" />
  </div>
)

export function useGrowl() {
    // state of the growl
    const [growlActive, setGrowlActive] = React.useState(false)

    // whenever the growl state change, if the active state is true, the useEffect
    // hook dismiss the growl automatically after 3 seconds.
    // The clearTimeout function clean the garbage collector whenever the timer constant is not used
    // anymore, to prevent memory leaks.
    useEffect(() => {
      if(growlActive){
        const timer = setTimeout(() => setGrowlActive(false), 3000);
    	  return () => clearTimeout(timer);
      }
    }, [growlActive]);

    return [
        // the first arg is the state
        growlActive, 

        // the second arg is a fn that allows you to safely set its state
        (active) => {
            setGrowlActive(active)
        },
    ]
}