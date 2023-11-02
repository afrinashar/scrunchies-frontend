const Form=()=>{
    return(
        <>
        <form>
  <div class="form-group row m-2">
    <label for="inputproductName3" class="col-sm-2 col-form-label text-light m-2 fw-bold">productName</label>
    <div class="col-sm-10">
      <input type="productName" class="form-control" id="inputproductName3" placeholder="productName"></input>
    </div>
  </div>
  <div class="form-group row">
    <label for="inputQuantity3" class="col-sm-2 col-form-label m-2 text-light fw-bold">Quantity</label>
    <div class="col-sm-10">
      <input type="Quantity" class="form-control" id="inputQuantity3" placeholder="Quantity"></input>
    </div>
  </div>
  
  
  <div class="form-group row">
    <div class="col-sm-10 float-end">
      <button type="submit" class="btn btn-success m-1">ORDER</button>
    </div>
  </div>
</form>
        
        </>
    )
}
export default Form