import Pagination from 'react-bootstrap/Pagination';
import { Link } from "react-router-dom";
function Products() {
  return (
    <>
<div className=' d-flex m-2   '   >
<form class="d-flex">
        <input class="form-control m-2"  type="search" placeholder="Search" aria-label="Search"></input>
        <button class="btn m-2 btn-outline-primary" type="submit">Search</button>
      </form> <Link to="./cart"  ><button type="button" class="btn m-2 btn-success">Cart</button></Link>

</div>
<div className="p-5 d-flex    overflow-auto " >
<div class="card col-md-4 m-5" style={{width: "18rem" }}>

<img class="card-img-top" src="https://imgs.search.brave.com/hi1PfqPEQ-sqAatB2yO9Ub6diW7jHgvJO3WN7-hdG20/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzIxMDg3MTI4L3Iv/aWwvMGY0NjY4LzI2/MTEzMjIzMDcvaWxf/NjAweDYwMC4yNjEx/MzIyMzA3X2RuNHUu/anBn" alt="Card image cap"></img>

<div class="card-body">
<p class="card-text">double color SCRUNCHIES</p>
<p class="card-text">5rs</p>  <button>+</button>0<button>-</button>
<div> <button type="button" class="btn btn-warning">add to CART</button> <button type="button" class="btn btn-success">Order</button></div>
</div>
</div>

<div class="card col-md-4 m-5" style={{width: "18rem" }}>

<img class="card-img-top" src="https://imgs.search.brave.com/hi1PfqPEQ-sqAatB2yO9Ub6diW7jHgvJO3WN7-hdG20/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzIxMDg3MTI4L3Iv/aWwvMGY0NjY4LzI2/MTEzMjIzMDcvaWxf/NjAweDYwMC4yNjEx/MzIyMzA3X2RuNHUu/anBn" alt="Card image cap"></img>

<div class="card-body">
<p class="card-text">double color SCRUNCHIES</p>
<p class="card-text">5rs</p><button>+</button>0<button>-</button>
<div> <button type="button" class="btn btn-warning">add to CART</button> <button type="button" class="btn btn-success">Order</button></div>
</div>
</div>
<div class="card col-md-4 m-5" style={{width: "18rem" }}>

<img class="card-img-top" src="https://imgs.search.brave.com/hi1PfqPEQ-sqAatB2yO9Ub6diW7jHgvJO3WN7-hdG20/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzIxMDg3MTI4L3Iv/aWwvMGY0NjY4LzI2/MTEzMjIzMDcvaWxf/NjAweDYwMC4yNjEx/MzIyMzA3X2RuNHUu/anBn" alt="Card image cap"></img>

<div class="card-body">
<p class="card-text">double color SCRUNCHIES</p>
<p class="card-text">5rs</p>  <button>+</button>0<button>-</button>
<div> <button type="button" class="btn btn-warning">add to CART</button> <button type="button" class="btn btn-success">Order</button></div>
</div>
</div>
<div class="card col-md-4 m-5" style={{width: "18rem" }}>

<img class="card-img-top" src="https://imgs.search.brave.com/hi1PfqPEQ-sqAatB2yO9Ub6diW7jHgvJO3WN7-hdG20/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzIxMDg3MTI4L3Iv/aWwvMGY0NjY4LzI2/MTEzMjIzMDcvaWxf/NjAweDYwMC4yNjEx/MzIyMzA3X2RuNHUu/anBn" alt="Card image cap"></img>

<div class="card-body">
<p class="card-text">double color SCRUNCHIES</p>
<p class="card-text">5rs</p> <button>+</button>0<button>-</button>
<div> <button type="button" class="btn btn-warning">add to CART</button> <button type="button" class="btn btn-success">Order</button></div>
</div>
</div>
<div class="card col-md-4 m-5" style={{width: "18rem" }}>

<img class="card-img-top" src="https://imgs.search.brave.com/hi1PfqPEQ-sqAatB2yO9Ub6diW7jHgvJO3WN7-hdG20/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzIxMDg3MTI4L3Iv/aWwvMGY0NjY4LzI2/MTEzMjIzMDcvaWxf/NjAweDYwMC4yNjEx/MzIyMzA3X2RuNHUu/anBn" alt="Card image cap"></img>

<div class="card-body">
<p class="card-text">double color SCRUNCHIES</p>
<p class="card-text">5rs</p>  <button>+</button>0<button>-</button>
<div> <button type="button" class="btn btn-warning">add to CART</button> <button type="button" class="btn btn-success">Order</button></div>
</div>
</div>

<div class="card col-md-4 m-5" style={{width: "18rem" }}>

<img class="card-img-top" src="https://imgs.search.brave.com/hi1PfqPEQ-sqAatB2yO9Ub6diW7jHgvJO3WN7-hdG20/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzIxMDg3MTI4L3Iv/aWwvMGY0NjY4LzI2/MTEzMjIzMDcvaWxf/NjAweDYwMC4yNjEx/MzIyMzA3X2RuNHUu/anBn" alt="Card image cap"></img>

<div class="card-body">
<p class="card-text">double color SCRUNCHIES</p>
<p class="card-text">5rs</p><button>+</button>0<button>-</button>
<div> <button type="button" class="btn btn-warning">add to CART</button> <button type="button" class="btn btn-success">Order</button></div>
</div>
</div>
<div class="card col-md-4 m-5" style={{width: "18rem" }}>

<img class="card-img-top" src="https://imgs.search.brave.com/hi1PfqPEQ-sqAatB2yO9Ub6diW7jHgvJO3WN7-hdG20/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzIxMDg3MTI4L3Iv/aWwvMGY0NjY4LzI2/MTEzMjIzMDcvaWxf/NjAweDYwMC4yNjEx/MzIyMzA3X2RuNHUu/anBn" alt="Card image cap"></img>

<div class="card-body">
<p class="card-text">double color SCRUNCHIES</p>
<p class="card-text">5rs</p>  <button>+</button>0<button>-</button>
<div> <button type="button" class="btn btn-warning">add to CART</button> <button type="button" class="btn btn-success">Order</button></div>
</div>
</div>
<div class="card col-md-4 m-5" style={{width: "18rem" }}>

<img class="card-img-top" src="https://imgs.search.brave.com/hi1PfqPEQ-sqAatB2yO9Ub6diW7jHgvJO3WN7-hdG20/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzIxMDg3MTI4L3Iv/aWwvMGY0NjY4LzI2/MTEzMjIzMDcvaWxf/NjAweDYwMC4yNjEx/MzIyMzA3X2RuNHUu/anBn" alt="Card image cap"></img>

<div class="card-body">
<p class="card-text">double color SCRUNCHIES</p>
<p class="card-text">5rs</p> <button>+</button>0<button>-</button>
<div> <button type="button" class="btn btn-warning">add to CART</button> <button type="button" class="btn btn-success">Order</button></div>
</div>
</div></div>
    <Pagination className='  m-5  '  >
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item disabled>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination></>
  );
}

export default Products;