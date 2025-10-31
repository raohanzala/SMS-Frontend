import PageToolbar from '@/components/common/PageToolbar'
import Button from '@/components/common/Button'
import { FiPlus } from 'react-icons/fi'
import ViewToggle from '@/components/common/ViewToggle'
import SearchBar from '@/components/common/SearchBar'

function StudentsToolbar({ onClickAddStudent }) {
  return (
    <PageToolbar>
      <SearchBar placeholder="Search students..." paramKey="student" />

      <div className='flex gap-5 items-center'>
        <ViewToggle />
        <Button onClick={onClickAddStudent} startIcon={<FiPlus className="mr-2 h-4 w-4" />}>Add Student</Button>
      </div>
    </PageToolbar>
  )
}

export default StudentsToolbar