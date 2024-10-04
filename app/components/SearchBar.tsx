import { IoSearchOutline } from "react-icons/io5";

const SearchBar = ({
    value,
    onChange,
    onSearch,
}: {
    value: string;
    onChange: (value: string) => void;
    onSearch: (query: string) => Promise<void>; 
}) => {
    const handleSearch = async () => {
        if (!value) {
            return;
        }
        await onSearch(value); 
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className="flex items-center gap-2 border border-blue-300 rounded-lg px-4 py-2 mb-5 w-80 outline-none">
            <IoSearchOutline className="text-black text-xl" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown} 
                placeholder="Search for your favourite movie"
                className="w-full outline-none text-black"
            />
            <span className="cursor-pointer text-gray-700" onClick={handleSearch}>search</span>
        </div>
    );
};

export default SearchBar;
