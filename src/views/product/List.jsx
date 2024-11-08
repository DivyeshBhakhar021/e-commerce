import React, { lazy, Component } from "react";
import { data } from "../../data";
import { connect, useDispatch, useSelector } from "react-redux";
import { filterdata, getproductlist } from "../../reduct/slice/productlist.slice";
// import {  getproductlist } from "../../reduct/slice/product.sllice";

const Paging = lazy(() => import("../../components/Paging"));
const Breadcrumb = lazy(() => import("../../components/Breadcrumb"));
const FilterCategory = lazy(() => import("../../components/filter/Category"));
const FilterPrice = lazy(() => import("../../components/filter/Price"));
const FilterSize = lazy(() => import("../../components/filter/Size"));
const FilterStar = lazy(() => import("../../components/filter/Star"));
const FilterColor = lazy(() => import("../../components/filter/Color"));
const FilterTag = lazy(() => import("../../components/filter/Tag"));
const FilterClear = lazy(() => import("../../components/filter/Clear"));
const CardServices = lazy(() => import("../../components/card/CardServices"));
const CardProductGrid = lazy(() =>
  import("../../components/card/CardProductGrid")
);
const CardProductList = lazy(() =>
  import("../../components/card/CardProductList")
);

class ProductListView extends Component {
  constructor(props) {
    super(props); 
      this.state = {
      currentPage: 1,
      totalPages: null,
      totalItems: 0,
      view: "list",
      productlist: [],
    };
        
    this.onPageChanged = this.onPageChanged.bind(this);
    this.onChangeView = this.onChangeView.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getproductlist(this.state.currentPage));
    this.setState({ productlist: this.props.productlist });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.productlist !== this.props.productlist) {
      this.setState({ productlist: this.props.productlist }); 
    }
  }

  onPageChanged = (page) => {
    console.log(page.currentPage);
    const currentPage = page.currentPage;
    const totalPages = page.totalPages;
    // const totalItems = page.totalItems;
    this.setState({ currentPage, totalPages });
    this.props.dispatch(getproductlist(page.currentPage));
  };

  onChangeView = (view) => {
    this.setState({ view });
  };

  handleSortChange = (value) => {
    console.log(value.target.value);
    this.props.dispatch(filterdata(value.target.value));


    // const selectedValue = value.target.value;

    // const data = this.state.productlist[0]?.map((v) => v)
    //   ? this.state.productlist[0]?.map((v) => v)
    //   : this.state.productlist?.map((v) => v);
    // let sortedProducts = data;

    // switch (selectedValue) {
    //   case "1":
    //     //  sortedProducts.sort((a, b) => b.popularity - a.popularity);
    //     break;
    //   case "2":
    //     //  sortedProducts.sort(
    //     //    (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
    //     //  );
    //     break;
    //   case "3":
    //     //  sortedProducts.sort((a, b) => b.trendScore - a.trendScore);
    //     break;
    //   case "4":
    //     sortedProducts.sort((a, b) => a.product_price - b.product_price);
    //     break;
    //   case "5":
    //     sortedProducts.sort((a, b) => b.product_price - a.product_price);
    //     break;
    //   default:
    //     break;
    // }
    // console.log(sortedProducts);

    // this.setState({ productlist: [sortedProducts] });
  };

  render() {
    const { view, productlist } = this.props;

    console.log(this.state.productlist);

    return (
      <React.Fragment>
        <div
          className="p-5 bg-primary bs-cover"
          style={{
            backgroundImage: "url(../../images/banner/50-Banner.webp)",
          }}
        >
          <div className="container text-center">
            <span className="display-5 px-3 bg-white rounded shadow">
              T-Shirts
            </span>
          </div>
        </div>
        <Breadcrumb />
        <div className="container-fluid mb-3">
          <div className="row">
            <div className="col-md-3">
              <FilterCategory />
              <FilterPrice />
              <FilterSize />
              <FilterStar />
              <FilterColor />
              <FilterClear />
              <FilterTag />
              <CardServices />
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-7">
                  <span className="align-middle fw-bold">
                    {this.state.productlist[1]?.totalItems} results for
                    <span className="text-warning">"t-shirts"</span>
                  </span>
                </div>
                <div className="col-5 d-flex justify-content-end">
                  <select
                    className="form-select mw-180 float-start"
                    aria-label="select"
                    onChange={this.handleSortChange}
                  >
                    <option value={1}>Most Popular</option>
                    <option value={2}>Latest items</option>
                    <option value={3}>Trending</option>
                    <option value="lh">Price low to high</option>
                    <option value="hl">Price high to low</option>
                  </select>
                  <div className="btn-group ms-3" role="group">
                    <button
                      aria-label="Grid"
                      type="button"
                      onClick={() => this.onChangeView("grid")}
                      className={`btn ${
                        this.state.view === "grid"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                    >
                      <i className="bi bi-grid" />
                    </button>
                    <button
                      aria-label="List"
                      type="button"
                      onClick={() => this.onChangeView("list")}
                      className={`btn ${
                        this.state.view === "list"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                    >
                      <i className="bi bi-list" />
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row g-3">
                {Array.isArray(this.state.productlist[0]) &&
                  this.state.productlist[0].length > 0 &&
                  this.state.view === "grid" &&
                  this.state.productlist[0].map((product, idx) => (
                    <div key={product.id || idx} className="col-md-4">
                      <CardProductGrid data={product} />
                    </div>
                  ))}
                {Array.isArray(this.state.productlist[0]) &&
                  this.state.productlist[0].length > 0 &&
                  this.state.view === "list" &&
                  this.state.productlist[0].map((product, idx) => (
                    <div key={product.id || idx} className="col-md-12">
                      <CardProductList data={product} />
                    </div>
                  ))}
              </div>
              <hr />
              <Paging
                totalRecords={productlist[1]?.totalItems}
                pageLimit={productlist[1]?.totalPages}
                pageNeighbours={3}
                onPageChanged={this.onPageChanged}
                sizing=""
                alignment="justify-content-center"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    productlist: state.productlist.productlist,
  };
};

export default connect(mapStateToProps)(ProductListView);
