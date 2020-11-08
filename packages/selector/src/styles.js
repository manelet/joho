export default `
body.locked {
  overflow: hidden;
}

.crawler--modal {
  font-family: Arial, Helvetica, sans-serif;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, .65);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999999999999999 !important;
}

.crawler--modal-inner {
  width: 100%;
  max-width: 500px;
  padding: 10px;
  border-radius: 5px;
  background-color: white;
  z-index: 9999999999999999 !important;
}

.crawler--modal-inner textarea {
  width: calc(100% - 10px);
  padding: 5px;
  min-height: 60px;
}

.crawler--modal-inner input[name=name] {
  width: calc(100% - 10px);
  padding: 5px;
  font-size: 28px;
}

.crawler--modal-inner ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.crawler--modal-close {
  position: absolute;
  width: 24px;
  height: 25px;
  top: 0;
  left: 0;
  cursor: pointer;
  margin: 1em;
  padding: 3px;
}

.crawler--modal-close svg {
  fill:none;
  stroke-linecap:round;
  stroke-linejoin:round;
  stroke-width:2px;
}

.crawler--log {
  font-family: Arial, Helvetica, sans-serif;
  /* border: 1px solid red; */
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 3em;
  width: 350px;
  height: 250px;
  background-color: white;
  border-radius: 5px;
  padding: 7px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 9999999999999999 !important;
}

.crawler--log button {
  width: 100%;
  padding: 10px;
  background-color: lightseagreen;
  color: white;
  text-transform: uppercase;
  font-size: 12px;
  border-radius: 3px;
  border: 0;
  cursor: pointer;
}

.crawler--log ul {
  padding: 0;
  margin: 0;
}

.crawler--log ul li {
  width: calc(100% - 20px);
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-radius: 3px;
}`