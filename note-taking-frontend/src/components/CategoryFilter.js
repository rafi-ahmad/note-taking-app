import React from "react";

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => (
  <div className="mb-4">
    <select
      value={selectedCategory}
      onChange={(e) => onSelectCategory(e.target.value)}
      className="p-2 border rounded"
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option
          key={category}
          value={category}
        >
          {category}
        </option>
      ))}
    </select>
  </div>
);

export default CategoryFilter;
