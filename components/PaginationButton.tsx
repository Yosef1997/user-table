import { Button } from './ui/button'

interface PaginationButtonProps {
  prevOnClik: () => void
  disabledPrev: boolean
  currentPage: number
  totalPage: number
  nextOnclik: () => void
  disabledNext: boolean
}

const PaginationButton: React.FC<PaginationButtonProps> = ({ ...props }) => {
  return (
    <div className='flex justify-between items-center'>
      <Button
        variant='outline'
        onClick={props.prevOnClik}
        disabled={props.disabledPrev}
      >
        Previous
      </Button>
      <span>
        Page {props.currentPage} of {props.totalPage}
      </span>
      <Button
        variant='outline'
        onClick={props.nextOnclik}
        disabled={props.disabledNext}
      >
        Next
      </Button>
    </div>
  )
}
export default PaginationButton
