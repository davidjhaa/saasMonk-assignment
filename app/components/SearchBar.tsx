import { IoSearchOutline } from "react-icons/io5";

const SearchBar = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
    return (
        <div className="flex items-center gap-2 border border-blue-300 rounded-lg px-4 py-2 mb-5 w-80 outline-none">
            <IoSearchOutline className="text-black text-xl"/>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search for your favourite movie"
                className="w-full outline-none text-black"
            />
        </div>
    );
};

export default SearchBar;
