import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getproduct } from "../../reduct/slice/product.sllice";
import { addToCart } from "../../reduct/slice/cart.slice";
import { getproductlist } from "../../reduct/slice/productlist.slice";

const CardProductList = (props) => {
  const product = props.data;
  console.log(product);  
  
 const dispatch = useDispatch();
   const handleCart = (item) => {
     dispatch(addToCart(item));
     console.log(item);
   };
  
  return (
    <>
      {product.length > 0 &&
        product.map((v, index) => (
          <div className="card mb-3">
            <div className="row g-0" key={index}>
              <>
                <div className="col-md-3 text-center">
                  <img
                    src={`/images/products/${v.img}`}
                    className="img-fluid"
                    alt={v.product_name}
                  />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <h6 className="card-subtitle me-2 d-inline">
                      <Link
                        to={`/product/detail/${v.id}`}
                        className="text-decoration-none"
                      >
                        {v.product_name}
                      </Link>
                    </h6>
                    {v.isNew && (
                      <span className="badge bg-success me-2">New</span>
                    )}
                    {v.isHot && (
                      <span className="badge bg-danger me-2">Hot</span>
                    )}

                    <div>
                      {v.rating > 0 &&
                        Array.from({ length: 5 }, (_, key) => (
                          <i
                            className={`bi bi-star-fill ${
                              key < v.rating ? "text-warning" : "text-secondary"
                            } me-1`}
                            key={key}
                          />
                        ))}
                    </div>
                    {v.product_detlis?.includes("|") ? (
                      <ul className="mt-2">
                        {v.product_detlis.split("|").map((desc, idx) => (
                          <li key={idx}>{desc}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="small mt-2">{v.product_detlis}</p>
                    )}
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card-body">
                    <div className="mb-2">
                      <span className="fw-bold h5">${v.product_price}</span>
                      {v.originPrice > 0 && (
                        <del className="small text-muted ms-2">
                          ${v.originPrice}
                        </del>
                      )}
                      {(v.discountPercentage > 0 || v.discountPrice > 0) && (
                        <span className={`rounded p-1 bg-warning ms-2 small`}>
                          -
                          {v.discountPercentage > 0
                            ? v.discountPercentage + "%"
                            : "$" + v.discountPrice}
                        </span>
                      )}
                    </div>
                    {v.isFreeShipping && (
                      <p className="text-success small mb-2">
                        <i className="bi bi-truck" /> Free shipping
                      </p>
                    )}

                    <div className="btn-group d-flex" role="group">
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        title="Add to cart"
                        onClick={() => handleCart(v)}
                      >
                        <i className="bi bi-cart-plus" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        title="Add to wishlist"
                      >
                        <i className="bi bi-heart-fill" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        ))}
    </>
  );
};

export default CardProductList;
