import { useParent } from './useParent'

function ParentDetails() {

  const { parent } = useParent()
  return (
    <div>

      <div>ParentDetails</div>
      {JSON?.stringify(parent)}
    </div>

  )
}

export default ParentDetails