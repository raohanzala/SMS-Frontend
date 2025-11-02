import PageToolbar from '@/components/common/PageToolbar'
import Button from '@/components/common/Button'
import { FiPlus } from 'react-icons/fi'
import ViewToggle from '@/components/common/ViewToggle'
import SearchBar from '@/components/common/SearchBar'
import { ParentsToolbarProps } from '../types/parent-components.interface'

const ParentsToolbar = ({ onClickAddParent } : ParentsToolbarProps) => {
  return (
    <PageToolbar>
      <SearchBar placeholder="Search parents..." paramKey="parent" />

      <div className='flex sm:gap-5 items-center'>
        <ViewToggle />
        <Button onClick={onClickAddParent} startIcon={<FiPlus className="mr-2 h-4 w-4" />}>Add Parent</Button>
      </div>
    </PageToolbar>
  )
}

export default ParentsToolbar