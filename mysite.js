let imgs = ["https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000&t=st=1694473438~exp=1694474038~hmac=7348cb720086d87666200b4b9a3959263726f1fe0d399f77622255517a4d809c", "https://img.freepik.com/free-vector/beautiful-watercolor-background_23-2148486848.jpg?w=2000&t=st=1694473502~exp=1694474102~hmac=07dcf8f6e518b9402e2367286beda82b778ebc0680c8a000f6fc0bd0db5326e0"];

let idx = 0;
function getNextImageUrl() {
  idx++;
  if (idx > 1)
    idx = 0;
  return imgs[idx];
}

function handleClick() {
  document.getElementById("card-image").src = getNextImageUrl();
}