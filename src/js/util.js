const spin = {
  show: () => {
    const ele = document.querySelector("#lmpSpin");
    ele.style.display = 'block'
  },
  hide: () => {
    const ele = document.querySelector("#lmpSpin");
    ele.style.display = "none";
  }
}

export { spin }