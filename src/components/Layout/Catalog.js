import "./Filter.css";
const Catalog = ({ categories, filterItems }) => {
  return (
    <div className="btn-container_sc">
      {categories.map((category, index) => {
        return (
          <button
            type="button"
            className="filter-btn"
            key={index}
            onClick={() => filterItems(category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default Catalog;
