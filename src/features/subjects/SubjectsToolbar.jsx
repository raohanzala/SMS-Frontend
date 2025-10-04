import PageToolbar from '@/components/common/PageToolbar'
import Button from '@/components/common/Button'
import { FiPlus } from 'react-icons/fi'
import ViewToggle from '@/components/common/ViewToggle'
import SearchBar from '@/components/common/SearchBar'

function SubjectsToolbar({ onClick }) {
  return (
    <PageToolbar>
      <SearchBar placeholder="Search subjects..." paramKey="subject" />

      <div className='flex gap-5 items-center'>
        <ViewToggle />
        <Button onClick={onClick} startIcon={<FiPlus className="mr-2 h-4 w-4" />}>Add Subject</Button>
      </div>
    </PageToolbar>
  )
}

export default SubjectsToolbar