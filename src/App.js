import { useEffect } from 'react'
export default function App() {
  async function getIPAddress() {
    const response = await fetch('https://api64.ipify.org?format=json');
    const data = await response.json();
    const formData = new FormData();

    const currentDate = new Date();
    console.log("Current Date:", currentDate);

    formData.append("Ip", data.ip);
    formData.append("Date", currentDate);
    Submit(formData)
  }

useEffect(() => {
  getIPAddress()
}, [])

  function Submit(formData) {
    fetch(
      "https://script.google.com/macros/s/AKfycby371zJi-MvOffwsjucxclSvKsC3-sVob58Jsq6c65AZBOcYxOVDIib-udp29NIHk5Fxg/exec",
      {
        method: "POST",
        body: formData
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="App" />
  );
}