
<script>
  let total = '';
  let input = '';

  const calculate = async () => {
    const response = await fetch('/api/calculate', {
      method: 'POST',
      body: JSON.stringify({ input }),
      headers: {
        'content-type': 'application/json'
      }
    });

    total = await response.json();
   console.log(total);
  } 

  const handelClick = (event) =>{
    const clickedValue = event.target.innerText;

    if ((/\d/).test(clickedValue) && (/\d/).test(input[input.length - 1])) {
      // If the clicked value and the last input value are both digits,
      // add the clicked value directly
      input += clickedValue;
    } else if ((/[-+*/]/).test(clickedValue) && (/[-+*/]/).test(input[input.length - 1])) {
      // If the clicked value is an operator and the last input value is also an operator,
      // replace the last operator with the new one
      input = input.slice(0, -1) + clickedValue;
    } else {
      // Otherwise, add the clicked value to the input
      input += clickedValue;
    }

  }
  const handleReset = ()=> {
  input = "";
  total = "";
}
const handleDelete= ()=> {
  input = input.slice(0, -1);
}


</script>
<head>
  <title>simple calculator</title>
</head>
<body>
  <div class="tittle">
    <h2>simple calculator</h2>
  </div>
  <div class="parent">
  <div class="container">
    <div class="container-head">
    <div class="container-input">
      <input type="text" bind:value={input}>
    </div>
    <div class="container-total">
      <p>TOTAL : {total}</p>
    </div>
  </div>
  <div class="container-body">
    <div class="container-numbers">
      <button on:click={handleReset }>C</button>
      <button on:click={handleDelete}>DEL</button>
      <button on:click={handelClick}>%</button>
      <button on:click={handelClick}>9</button>
      <button on:click={handelClick}>8</button>
      <button on:click={handelClick}>7</button>
      <button on:click={handelClick}>6</button>
      <button on:click={handelClick}>5</button>
      <button on:click={handelClick}>4</button>
      <button on:click={handelClick}>3</button>
      <button on:click={handelClick}>2</button>
      <button on:click={handelClick}>1</button>
      <button on:click={handelClick}>0</button>
      <button on:click={handelClick}>00</button>
      <button on:click={handelClick}>.</button>

    </div>
    <div class="container-operators">
      <button class="operator" on:click={handelClick}>+</button>
      <button class="operator" on:click={handelClick}>-</button>
      <button class="operator" on:click={handelClick}>/</button>
      <button class="operator" on:click={handelClick}>*</button>
      <button class="calc" on:click={calculate}>=</button>
    </div>

  </div>
  </div>
</div>
</body>

<style>
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  
   
  }
  .tittle{
    display: flex;
    justify-content: center;
    padding-top: 20px;
    font-weight: bolder;
    font-family: 'Courier New', Courier, monospace;
  }
  .parent{
    width: 100vw;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: #0b303d;; */
  }
  .container{
    width: 300px;
    height: 400px;
    background-color: white;
    border: 1px solid #adabab;
    border-radius: 8px;
  }
  .container-head{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-bottom: 1px solid #ccc;
    width: 100%;
    padding: 5px;
  }
  .container-input{
    /* border: 1px solid black; */
    width: 100%;
  }
  .container-input input{
    width: 100%;
    height: 50px;
    border: none;
    outline: none;
    border-bottom: 1px solid #ccc;    
  }
  .container-total{
    /* border: 1px solid black; */
    width: 100%;
    height: 30px;
  }
  .container-total p{
    margin-top: 8px;
    /* height: 30px; */
  }
  .container-body{
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid black; */
  }
  .container-numbers{
    display: grid;
    grid-template-columns: auto auto auto;

  }
  .container-operators{
    display: flex;
    flex-direction: column;
  }
  button{
    width: 50px;
    height: 50px;
    margin: 2px;
    font-size: medium;
  }

</style>