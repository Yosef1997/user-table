import { Input } from './ui/input'

interface SearchBarProps {
  placeholder: string
  defaultValue: string
  disabled: boolean
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  defaultValue,
  disabled,
  onChange,
}) => {
  return (
    <Input
      placeholder={placeholder}
      value={defaultValue}
      onChange={onChange}
      disabled={disabled}
      className='max-w-sm'
    />
  )
}
export default SearchBar
