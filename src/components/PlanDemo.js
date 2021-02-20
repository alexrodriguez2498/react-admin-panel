import React from 'react'
import { Card } from 'primereact/card'


export const PlanDemo = ({ img, title, subtitle }) => {
  return (
    <Card header={img} title={title} subTitle={subtitle} style={{ maxWidth: "150px" , margin: "0 1rem 1.5rem 0"}} />
  )
}
