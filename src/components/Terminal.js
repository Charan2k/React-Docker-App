import React from 'react'

export default function Terminal(props) {
    return (
        <div>
            <textarea className="container" style={{"color":"white",
            "backgroundColor": "black",
            "width":"100vw", "height":"60vh", 
            "content":"ehhe"}}
            value={props.text}
            onChange={(e) => props.onChange(e)}
            id="terminal"
            />
            <br/>
        </div>
    )
}
