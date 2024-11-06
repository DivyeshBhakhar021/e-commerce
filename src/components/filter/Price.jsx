import React, { useState, useEffect } from "react";

const FilterPrice = (props) => {
  const [selectedRanges, setSelectedRanges] = useState({
    range1: false,
    range2: false,
    range3: false,
  });
  const [filteredProducts, setFilteredProducts] = useState(props.productlist);

  // Function to handle checkbox changes
  const handleCheckboxChange = (range) => {
    setSelectedRanges((prevSelected) => {
      const newSelected = { ...prevSelected, [range]: !prevSelected[range] };

      // Filter the products based on selected price ranges
      filterProducts(newSelected);

      return newSelected;
    });
  };

  // Function to filter products based on selected price ranges
  const filterProducts = (selectedRanges) => {
    const { range1, range2, range3 } = selectedRanges;
    const filtered = props.productlist.filter((product) => {
      if (range1 && product.price >= 100 && product.price <= 499) return true;
      if (range2 && product.price >= 500 && product.price <= 999) return true;
      if (range3 && product.price >= 1000 && product.price <= 1500) return true;
      return false;
    });
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    // Initial filter application if any ranges are pre-selected
    filterProducts(selectedRanges);
  }, [props.productlist]); // Re-filter if the product list changes

  return (
    <div className="card mb-3">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterPrice"
        aria-expanded="true"
        aria-controls="filterPrice"
      >
        Price
      </div>
      <ul className="list-group list-group-flush show" id="filterPrice">
        <li className="list-group-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={selectedRanges.range1}
              onChange={() => handleCheckboxChange("range1")}
              id="flexCheckDefault1"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault1">
              $100.00 - $499.00{" "}
              <span className="text-muted">
                (
                {
                  filteredProducts.filter(
                    (product) => product.price >= 100 && product.price <= 499
                  ).length
                }
                )
              </span>
            </label>
          </div>
        </li>
        <li className="list-group-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={selectedRanges.range2}
              onChange={() => handleCheckboxChange("range2")}
              id="flexCheckDefault2"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault2">
              $500.00 - $999.00{" "}
              <span className="text-muted">
                (
                {
                  filteredProducts.filter(
                    (product) => product.price >= 500 && product.price <= 999
                  ).length
                }
                )
              </span>
            </label>
          </div>
        </li>
        <li className="list-group-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={selectedRanges.range3}
              onChange={() => handleCheckboxChange("range3")}
              id="flexCheckDefault3"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault3">
              $1000.00 - $1500.00{" "}
              <span className="text-muted">
                (
                {
                  filteredProducts.filter(
                    (product) => product.price >= 1000 && product.price <= 1500
                  ).length
                }
                )
              </span>
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FilterPrice;
 