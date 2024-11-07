import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getproduct } from "../../reduct/slice/product.sllice";
import { addToCart } from "../../reduct/slice/cart.slice";
import { getproductlist } from "../../reduct/slice/productlist.slice";

const CardProductList = (props) => {
  const product = props.data;
  // console.log(product);  

  // product.map((v)=>console.log(v))
  
 const dispatch = useDispatch();
   const handleCart = (item) => {
     dispatch(addToCart(item));
     console.log(item);
   };
  
  return (
    <>
      {/* {product.length > 0 &&
        product.map((v, index) => ( */}
      <div className="card mb-3">
        <div className="row g-0">
          <>
            <div className="col-md-3 text-center">
              <img
                src={`/images/products/${product.img}`}
                className="img-fluid"
                alt={product.product_name}
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h6 className="card-subtitle me-2 d-inline">
                  <Link
                    to={`/product/detail/${product.id}`}
                    className="text-decoration-none"
                  >
                    {product.product_name}
                  </Link>
                </h6>
                {product.isNew && (
                  <span className="badge bg-success me-2">New</span>
                )}
                {product.isHot && (
                  <span className="badge bg-danger me-2">Hot</span>
                )}

                <div>
                  {product.rating > 0 &&
                    Array.from({ length: 5 }, (_, key) => (
                      <i
                        className={`bi bi-star-fill ${
                          key < product.rating
                            ? "text-warning"
                            : "text-secondary"
                        } me-1`}
                        key={key}
                      />
                    ))}
                </div>
                {product.product_detlis?.includes("|") ? (
                  <ul className="mt-2">
                    {product.product_detlis.split("|").map((desc, idx) => (
                      <li key={idx}>{desc}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="small mt-2">{product.product_detlis}</p>
                )}
              </div>
            </div>
            <div className="col-md-3">
              <div className="card-body">
                <div className="mb-2">
                  <span className="fw-bold h5">${product.product_price}</span>
                  {product.originPrice > 0 && (
                    <del className="small text-muted ms-2">
                      ${product.originPrice}
                    </del>
                  )}
                  {(product.discountPercentage > 0 ||
                    product.discountPrice > 0) && (
                    <span className={`rounded p-1 bg-warning ms-2 small`}>
                      -
                      {product.discountPercentage > 0
                        ? product.discountPercentage + "%"
                        : "$" + product.discountPrice}
                    </span>
                  )}
                </div>
                {product.isFreeShipping && (
                  <p className="text-success small mb-2">
                    <i className="bi bi-truck" /> Free shipping
                  </p>
                )}

                <div className="btn-group d-flex" role="group">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    title="Add to cart"
                    onClick={() => handleCart(product)}
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
      {/* ))} */}
    </>
  );
};

export default CardProductList;
