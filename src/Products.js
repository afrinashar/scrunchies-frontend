import Pagination from 'react-bootstrap/Pagination';

function Products() {
  return (
    <>
<div>

<button type="button" class="btn btn-success">Order</button>
</div>
{/* <div className='card'>
<div class="card" style="width: 18rem;">
<img class="card-img-top" src="https://imgs.search.brave.com/hi1PfqPEQ-sqAatB2yO9Ub6diW7jHgvJO3WN7-hdG20/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzIxMDg3MTI4L3Iv/aWwvMGY0NjY4LzI2/MTEzMjIzMDcvaWxf/NjAweDYwMC4yNjEx/MzIyMzA3X2RuNHUu/anBn" alt="Card image cap"></img>
<div class="card-body">
<p class="card-text">double color SCRUNCHIES</p>
<p class="card-text">5rs</p>
<div> <button type="button" class="btn btn-warning">add to CART</button> <button type="button" class="btn btn-success">Order</button></div>
</div>
</div>
<div class="card" style="width: 18rem;">
<img class="card-img-top" src="https://imgs.search.brave.com/hi1PfqPEQ-sqAatB2yO9Ub6diW7jHgvJO3WN7-hdG20/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzIxMDg3MTI4L3Iv/aWwvMGY0NjY4LzI2/MTEzMjIzMDcvaWxf/NjAweDYwMC4yNjEx/MzIyMzA3X2RuNHUu/anBn" alt="Card image cap"></img>
<div class="card-body">
<p class="card-text">double color SCRUNCHIES</p>
<p class="card-text">5rs</p>
<div> <button type="button" class="btn btn-warning">add to CART</button> <button type="button" class="btn btn-success">Order</button></div>
</div>
</div>
<div class="card" style="width: 18rem;">
<img class="card-img-top" src="https://imgs.search.brave.com/hi1PfqPEQ-sqAatB2yO9Ub6diW7jHgvJO3WN7-hdG20/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzIxMDg3MTI4L3Iv/aWwvMGY0NjY4LzI2/MTEzMjIzMDcvaWxf/NjAweDYwMC4yNjEx/MzIyMzA3X2RuNHUu/anBn" alt="Card image cap"></img>
<div class="card-body">
<p class="card-text">double color SCRUNCHIES</p>
<p class="card-text">5rs</p>
<div> <button type="button" class="btn btn-warning">add to CART</button> <button type="button" class="btn btn-success">Order</button></div>
</div>
</div>

<div class="card" style="width: 18rem;">
<img class="card-img-top" src="https://imgs.search.brave.com/hi1PfqPEQ-sqAatB2yO9Ub6diW7jHgvJO3WN7-hdG20/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzIxMDg3MTI4L3Iv/aWwvMGY0NjY4LzI2/MTEzMjIzMDcvaWxf/NjAweDYwMC4yNjEx/MzIyMzA3X2RuNHUu/anBn" alt="Card image cap"></img>
<div class="card-body">
<p class="card-text">double color SCRUNCHIES</p>
<p class="card-text">5rs</p>
<div> <button type="button" class="btn btn-warning">add to CART</button> <button type="button" class="btn btn-success">Order</button></div>
</div>
</div>


</div> */}
    <Pagination>
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