import React from 'react'
import { useParent } from './useParent'

function ParentDetails() {

  const { parent, isPending } = useParent()
  return (
    <div>ParentDetails</div>
  )
}

export default ParentDetails