const NavItem = ({ list, setItems }) => {
    const handleChange = (e) => {
        const query = "SELECT lists.id lists.name tasks.id tasks.name tasks.status tasks.list_id FROM lists JOIN tasks ON lists.id = tasks.list_id WHERE lists.name = '" + list + "'";
    }

    return (
        <div 
            className="m-2 p-2 dark:hover:bg-slate-800 rounded-lg cursor-pointer" 
            onClick={() => {
                handleChange();
            }}
          >
            <p className="text-gray-600">{list}</p>
        </div>
    );
}
export default NavItem;