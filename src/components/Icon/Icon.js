import "./Icon.css"
import React from 'react'
import styled from "styled-components"

 export const IconStyle = styled.div`
    font-size: 32px;
    width: 1em;
    height: 1em;
    background-color: ${({backgroundColor}) => backgroundColor || '#D3BDFF'};
    border-radius: 16px;
    padding: 0.5em;
    color: ${({color}) => color || '#7F3DFF'};
`

 export const Icon = (props) => {
    return (
      <IconStyle {...props}>
          <props.icon/>
      </IconStyle>
    )
  }
